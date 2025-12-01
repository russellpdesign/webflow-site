class ScrollSection {
  constructor({ el }) {
    this.el = document.querySelector(el);
    this.start = 0;
    this.end = 0;
  }

  measure() {}
  update(scrollY) {}
}
