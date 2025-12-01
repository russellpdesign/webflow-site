// -------------------------------------------------------
// Your Section, now powered by smoothed scroll
// -------------------------------------------------------
class HomeScrollSection extends ScrollSection {
  constructor(opts) {
    super(opts);

    this.progressBarInside = document.querySelector(".vertical-progress-bar-inside");
    this.homeScrollSection = document.querySelector(".home-scroll-section.is-don");

    this.triggers = document.querySelectorAll(".overview_trigger");
    this.nav = document.querySelector("#navigation");

    this.titleItems = document.querySelectorAll(".home-scroll-title");
    this.textItems = document.querySelectorAll(".body-text.home-scroll");
    this.numberItems = document.querySelectorAll(".home-scroll-item-number");
    this.imgItems = document.querySelectorAll(".home-scroll-img-item");

    this.sectionHeader = document.querySelector(".section-header-text");
    this.scrollbar = document.querySelector(".vertical-progress-bar");
  }

  measure() {
    const currentPosition = window.scrollY;
    const rect = this.homeScrollSection.getBoundingClientRect();

    const triggersHeight =
      this.triggers[0].getBoundingClientRect().height * this.triggers.length;

    this.sectionLength = triggersHeight;
    this.viewportHeight = window.innerHeight;

    this.start = rect.top + currentPosition;
    this.end = this.start + this.sectionLength;

    this.secondStart = this.start + this.viewportHeight;
    this.thirdStart = this.start + (this.viewportHeight * 2);
  }

  update(scrollY) {
    // All animations now use the smoothed scrollY value
    if (scrollY < this.start) this.resetAll();

    if (scrollY >= this.start && scrollY <= this.secondStart) {
      this.activateStage(0);
    }

    if (scrollY >= this.secondStart && scrollY <= this.thirdStart) {
      this.activateStage(1);
    }

    if (scrollY >= this.thirdStart && scrollY <= this.end) {
      this.activateStage(2);
    }

    if (scrollY > this.end) {
      this.afterEnd();
    }

    this.updateProgressBar(scrollY);
  }

  updateProgressBar(scrollY) {
    if (scrollY < this.start) {
      this.progressBarInside.style.transform = "translate3d(0, 0%, 0)";
      return;
    }

    if (scrollY > this.end) {
      this.progressBarInside.style.transform = "translate3d(0, 200%, 0)";
      return;
    }

    const yPercent = (((scrollY - this.start) / (this.end - this.start)) * 100) * 2;
    this.progressBarInside.style.transform = `translate3d(0, ${yPercent}%, 0)`;
  }

  resetAll() {
    this.titleItems.forEach(i => i.classList.remove("is-active"));
    this.textItems.forEach(i => i.classList.remove("is-active"));
    this.numberItems.forEach(i => i.classList.remove("is-active"));
    this.imgItems.forEach(i => i.classList.remove("is-active"));
    this.sectionHeader.classList.remove("is-active");
  }

  activateStage(index) {
    this.sectionHeader.classList.add("is-active");

    for (let i = 0; i < this.titleItems.length; i++) {
      const active = i === index;
      this.titleItems[i].classList.toggle("is-active", active);
      this.textItems[i].classList.toggle("is-active", active);
      this.numberItems[i].classList.toggle("is-active", active);
      this.imgItems[i].classList.toggle("is-active", active);
    }

    this.scrollbar.classList.remove("is-gone");
  }

  afterEnd() {
    this.titleItems[2].classList.remove("is-active");
    this.textItems[2].classList.remove("is-active");
    this.numberItems[2].classList.remove("is-active");
    this.scrollbar.classList.add("is-gone");
    this.imgItems[2].classList.add("is-active");
    this.sectionHeader.classList.remove("is-active");
    this.progressBarInside.style.transform = "translate3d(0, 200%, 0)";
  }
}
