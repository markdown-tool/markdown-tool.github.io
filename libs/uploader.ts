import AV from "leancloud-storage/dist/av";

function parse() {
  const arr = [
    "_*{*L*k*K*}*[*W*{*Y*[*L*=*|*V*\x81*X*Q*V*^*U*~*Y*P*7*q*\x84*Q*\x84*y*R*}*\x84",
    "\x7F*\x80*C*O*\x83*[*w*u*q*b*A*_*t*_*~*>*^*o*`*_*L*r*`*k",
  ];
  return arr.map((s) =>
    s
      .split("*")
      .map((c) => c.charCodeAt(0) - 10)
      .map((n) => String.fromCharCode(n))
      .join(""),
  );
}

const Uploader = {
  $fileInput: null as HTMLInputElement | null,
  $textarea: null as HTMLTextAreaElement | null,

  init() {
    this.$fileInput = document.querySelector("#img-uploader");
    this.$textarea = document.querySelector(".editor textarea");
    const [x, y] = parse();
    AV.init({
      appId: x,
      appKey: y,
      serverURLs: process.env.NEXT_PUBLIC_URL,
    });
    this.bind();
  },

  bind() {
    const self = this;
    if (!this.$fileInput) return;
    this.$fileInput.addEventListener(
      "change",
      function (this: HTMLInputElement) {
        if (!this.files || this.files.length === 0) return;
        const localFile = this.files[0];
        if (localFile.size / 1048576 > 4) {
          alert("文件不能超过4M");
          return;
        }
        self.insertText(`![上传中，进度0%]()`);
        const avFile = new AV.File(encodeURI(localFile.name), localFile);
        avFile
          .save({
            keepFileName: true,
            onprogress(progress: { percent: number }) {
              self.insertText(`![上传中，进度${progress.percent}%]()`);
            },
          })
          .then((file: { attributes: { url: string } }) => {
            const text = `![](${file.attributes.url})<!-- .element: style="height:200px" -->`;
            self.insertText(text);
          })
          .catch((err: unknown) => console.log(err));
      },
    );
  },

  insertText(text = "") {
    const $textarea = this.$textarea;
    if (!$textarea) return;
    const start = $textarea.selectionStart;
    const end = $textarea.selectionEnd;
    const oldText = $textarea.value;
    $textarea.setSelectionRange(start, start);
    $textarea.value = `${oldText.substring(0, start)}${text} ${oldText.substring(
      end,
    )}`;
    $textarea.focus();
    $textarea.setSelectionRange(start, start + text.length);
  },
};

export default Uploader;
