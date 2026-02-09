import Event from "@/libs/event";

const Theme = {
  $$figures: document.querySelectorAll<HTMLElement>(".theme figure"),
  $transition: null as HTMLSelectElement | null,
  $align: null as HTMLSelectElement | null,
  $reveal: null as HTMLElement | null,

  init() {
    this.$$figures = document.querySelectorAll<HTMLElement>(".theme figure");
    this.$transition = document.querySelector(".theme .transition");
    this.$align = document.querySelector(".theme .align");
    this.$reveal = document.querySelector(".reveal");

    this.bind();
    this.loadTheme();
  },

  bind() {
    this.$$figures.forEach(
      ($figure) =>
        ($figure.onclick = () => {
          this.$$figures.forEach(($item) => $item.classList.remove("select"));
          $figure.classList.add("select");
          localStorage.theme = $figure.dataset.theme || "";
          this.loadTheme();
          Event.fire("menuclose");
        }),
    );

    if (this.$transition) {
      this.$transition.addEventListener(
        "change",
        function (this: HTMLSelectElement) {
          localStorage.transition = this.value;
          location.href = location.origin + location.pathname + location.hash;
        },
      );
    }

    if (this.$align) {
      this.$align.addEventListener(
        "change",
        function (this: HTMLSelectElement) {
          localStorage.align = this.value;
          location.href = location.origin + location.pathname + location.hash;
        },
      );
    }
  },

  loadTheme() {
    const theme = localStorage.theme || "beige";
    const $theme = document.querySelector("#link-theme");
    if ($theme) {
      document.head.removeChild($theme);
    }

    const $link = document.createElement("link");
    $link.id = "link-theme";
    $link.rel = "stylesheet";
    $link.href = `/theme/${theme}.css`;
    document.head.appendChild($link);

    Array.from<HTMLElement>(this.$$figures)
      .find(($figure) => $figure.dataset.theme === theme)
      ?.classList.add("select");

    if (this.$transition) {
      this.$transition.value = localStorage.transition || "slide";
    }
    if (this.$align) {
      this.$align.value = localStorage.align || "center";
    }
    if (this.$reveal && this.$align) {
      this.$reveal.classList.add(this.$align.value);
    }
  },
};

export default Theme;
