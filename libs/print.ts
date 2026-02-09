const Print = {
  $download: null as HTMLElement | null,

  init() {
    this.$download = document.querySelector(".download");

    this.bind();
    this.start();
  },

  bind() {
    this.$download?.addEventListener("click", () => {
      const $link = document.createElement("a");
      $link.setAttribute("target", "_blank");
      $link.setAttribute(
        "href",
        location.href.replace(/(#\/.*)|$/, "?print-pdf")
      );
      $link.click();
    });

    window.onafterprint = () => {
      window.close();
    };
  },

  start() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.id = "link-print";
    if (window.location.search.match(/print-pdf/gi)) {
      link.href = "/print/pdf.css";
      setTimeout(() => {
        window.print();
      }, 500);
    } else {
      link.href = "/print/paper.css";
    }
    document.head.append(link);
  },
};

export default Print;
