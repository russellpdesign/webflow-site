// -------------------------------------------------------
// Scroll Engine with LERP smooth scroll
// -------------------------------------------------------
class ScrollEngine {
  constructor(sections = []) {
    this.sections = sections;

    // Raw vs smoothed scroll
    this.rawScroll = 0;
    this.smoothScroll = 0;

    // Lower = smoother. Higher = snappier
    this.lerpSpeed = 0.08;

    // Bind loop
    this.raf = this.raf.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);

    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);

    this.onResize();
    this.raf();
  }

  // Capture real scroll instantly
  onScroll() {
    this.rawScroll = window.scrollY;
  }

  // Recalculate section layout
  onResize() {
    this.sections.forEach(section => section.measure());
  }

  // Lerp the scroll + update sections
  raf() {
    requestAnimationFrame(this.raf);

    // Linear interpolation: closer to raw each frame
    this.smoothScroll += (this.rawScroll - this.smoothScroll) * this.lerpSpeed;

    // Feed smoothed value to all sections
    this.sections.forEach(section => {
      section.update(this.smoothScroll);
    });
  }
}
