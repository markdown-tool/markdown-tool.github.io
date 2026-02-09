import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";
import MathPlugin from "reveal.js/plugin/math/math.esm.js";
import { debounce } from "lodash";
import convert from "@/libs/convert";
import ComplexText from "@/libs/example-complex.js";
import SimpleText from "@/libs/example-simple.js";

const parseQuery = (search: string) => {
  const obj: Record<string, string> = {};
  search
    .replace(/^\?/, "")
    .split("&")
    .filter(Boolean)
    .forEach((s) => {
      const [key, value] = s.split("=");
      if (!key) return;
      obj[key] = decodeURIComponent(value || "");
    });
  return obj;
};

const Editor = {
  $editInput: null as HTMLTextAreaElement | null,
  $saveBtn: null as HTMLElement | null,
  $resetSimpleBtn: null as HTMLElement | null,
  $resetComplexBtn: null as HTMLElement | null,
  $slideContainer: null as HTMLElement | null,
  $fetchBtn: null as HTMLElement | null,
  $previewBtn: null as HTMLElement | null,
  $input: null as HTMLInputElement | null,
  $status: null as HTMLElement | null,
  $loadingText: null as HTMLElement | null,
  markdown: "" as string,

  init() {
    this.$editInput = document.querySelector(".editor textarea");
    this.$saveBtn = document.querySelector(".editor .button-save");
    this.$resetSimpleBtn = document.querySelector(
      ".editor .button-reset-simple"
    );
    this.$resetComplexBtn = document.querySelector(
      ".editor .button-reset-complex"
    );
    this.$slideContainer = document.querySelector(".slides");
    this.$fetchBtn = document.querySelector(".button-fetch");
    this.$previewBtn = document.querySelector(".button-preview");
    this.$input = document.querySelector(".input-url");
    this.$status = document.querySelector(".status");
    this.$loadingText = document.querySelector(".loading p");
    this.markdown = localStorage.markdown || ComplexText;
    this.bind();
    this.start();
  },

  bind() {
    this.$saveBtn?.addEventListener("click", () => {
      if (!this.$editInput) return;
      localStorage.markdown = this.$editInput.value;
      location.href = location.origin + location.pathname + location.hash;
      location.reload();
    });
    this.$resetSimpleBtn?.addEventListener("click", () => {
      if (this.$editInput) {
        this.$editInput.value = SimpleText;
      }
    });
    this.$resetComplexBtn?.addEventListener("click", () => {
      if (this.$editInput) {
        this.$editInput.value = ComplexText;
      }
    });
    this.$fetchBtn?.addEventListener("click", async () => {
      if (!this.$input || !this.$editInput || !this.$status) return;
      localStorage.url = this.$input.value;
      this.$status.innerText = "Syncing...";
      const res = await (
        await fetch(
          "https://api.jirengu.com/api/github/raw?url=" + this.$input.value
        )
      ).json();
      if (res.errCode !== 0) {
        this.$status.innerText = "Sync failed. Please try again.";
      } else {
        this.$editInput.value = res.data;
        this.$status.innerText =
          "Sync complete. Save above to preview the result.";
      }
    });
    this.$previewBtn?.addEventListener("click", () => {
      if (!this.$input) return;
      location.href =
        location.origin +
        location.pathname +
        "?url=" +
        encodeURIComponent(this.$input.value);
    });
    if (this.$editInput) {
      this.$editInput.oninput = debounce(() => {
        if (!this.$editInput) return;
        localStorage.markdown = this.$editInput.value;
      }, 1000);
    }
  },

  async start() {
    if (!this.$editInput || !this.$input || !this.$slideContainer) return;
    const queryObj = parseQuery(location.search);
    if (queryObj.url) {
      const res = await (
        await fetch(
          "https://api.jirengu.com/api/github/raw?url=" + queryObj.url
        )
      ).json();
      if (res.errCode !== 0) {
        if (this.$loadingText) {
          this.$loadingText.innerText =
            "Failed to load markdown. Refresh to retry.";
        }
        return;
      }
      localStorage.markdown = this.markdown = this.$editInput.value = res.data;
      localStorage.url = queryObj.url;
      localStorage.autoSlide = queryObj.autoSlide || "";
    } else {
      this.$editInput.value = this.markdown;
      this.$input.value = localStorage.url || "";
    }

    this.$slideContainer.innerHTML = convert(this.markdown);
    const options: Record<string, unknown> = {
      controls: true,
      progress: true,
      center: localStorage.center === "left-top" ? false : true,
      hash: true,
      transition: localStorage.transition || "slide",
      plugins: [Markdown, Highlight, Notes, MathPlugin.KaTeX],
    };
    if (localStorage.autoSlide !== "") {
      options.autoSlide = parseInt(localStorage.autoSlide, 10);
      options.loop = true;
    }
    Reveal.initialize(options);
  },
};

export default Editor;
