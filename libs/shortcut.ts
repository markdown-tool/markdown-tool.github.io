const $ = (s: string) => document.querySelector(s) as HTMLElement | null;

$(".editor .button-step")?.addEventListener("click", () => {
  insertText('<!-- .element: class="fragment" -->');
});

$(".editor .button-animation")?.addEventListener("click", () => {
  insertText("<!-- .slide: data-auto-animate -->");
});

$(".editor .button-style")?.addEventListener("click", () => {
  insertText('<!-- .element: class="fragment" style="" -->');
});

$(".editor .button-code")?.addEventListener("click", () => {
  insertText(`
\`\`\`[1-3|4-5]  

\`\`\`  
  `);
});

const $color = $(".editor .button-color") as HTMLSelectElement | null;
$color?.addEventListener("change", function () {
  const color = this.value;
  if (color === "none") return;
  insertText(`<${color}> </${color}>`);
  this.value = "none";
});

const $animate = $(".editor .button-animate") as HTMLSelectElement | null;
$animate?.addEventListener("change", function () {
  const animate = this.value;
  if (animate === "none") return;
  insertText(`<!-- .element: class="fragment animate__animated ${animate}" -->`);
  this.value = "none";
});

function insertText(text = "") {
  const $textarea = document.querySelector(
    ".editor textarea"
  ) as HTMLTextAreaElement | null;
  if (!$textarea) return;
  const start = $textarea.selectionStart;
  const end = $textarea.selectionEnd;
  const oldText = $textarea.value;

  $textarea.value = `${oldText.substring(0, start)}${text} ${oldText.substring(
    end
  )}`;
  $textarea.setSelectionRange(start, start);
  $textarea.focus();
  $textarea.setSelectionRange(start, start + text.length);
}
