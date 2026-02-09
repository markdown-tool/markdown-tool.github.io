import Event from "@/libs/event";

const Menu = {
  $settingIcon: null as HTMLElement | null,
  $menu: null as HTMLElement | null,
  $closeIcon: null as HTMLElement | null,
  $$tabs: document.querySelectorAll<HTMLElement>(".menu .tab"),
  $$contents: document.querySelectorAll<HTMLElement>(".menu .content"),

  init() {
    this.$settingIcon = document.querySelector(".control .icon-setting");
    this.$menu = document.querySelector(".menu");
    this.$closeIcon = document.querySelector(".menu .icon-close");
    this.$$tabs = document.querySelectorAll<HTMLElement>(".menu .tab");
    this.$$contents = document.querySelectorAll<HTMLElement>(".menu .content");

    this.bind();
  },

  bind() {
    Event.on("menuclose", () => {
      this.close();
    });

    Event.on("menuopen", () => {
      this.open();
    });

    if (this.$settingIcon) {
      this.$settingIcon.onclick = () => {
        this.open();
      };
    }

    if (this.$closeIcon) {
      this.$closeIcon.onclick = () => {
        this.close();
      };
    }

    this.$$tabs.forEach(
      ($tab) =>
        ($tab.onclick = () => {
          this.$$tabs.forEach(($node) => $node.classList.remove("active"));
          $tab.classList.add("active");
          const index = [...this.$$tabs].indexOf($tab);
          this.$$contents.forEach(($node) => $node.classList.remove("active"));
          const target = this.$$contents[index];
          if (target) {
            target.classList.add("active");
          }
        })
    );
  },

  open() {
    this.$menu?.classList.add("open");
  },

  close() {
    this.$menu?.classList.remove("open");
  },
};

export default Menu;
