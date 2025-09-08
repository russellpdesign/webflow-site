gsap.to(".load_columns-item", {
  yPercent: -100,
  duration: 1,
  stagger: { amount: 0.3, from: "random" },
  ease: "expo.inOut",
  onComplete: () => {
    gsap.set(".load_columns", { display: "none" });
  },
});

$(document).ready(function () {
  $("a").on("click", function (e) {
    console.log($(this).attr("href").indexOf("#"));
    if (
      $(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank"
    ) {
      console.log("this is the page leave columns animation");
      e.preventDefault();
      let destination = $(this).attr("href");
      gsap.set(".load_columns", { display: "grid" });
      gsap.fromTo(
        ".load_columns-item",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          stagger: { amount: 0.3, from: "random" },
          ease: "expo.inOut",
          onComplete: () => {
            window.location = destination;
          },
        }
      );
    } // ends first if statement

    if (
      $(this).attr("href").indexOf("#") === 1 &&
      window.location.pathname !== "/"
    ) {
      console.log(
        "The projects link was clicked, and I am not on the Home page - site wide code embed"
      );
      e.preventDefault();
      let destination = $(this).attr("href");
      gsap.set(".load_columns", { display: "grid" });
      gsap.fromTo(
        ".load_columns-item",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          stagger: { amount: 0.3, from: "random" },
          ease: "expo.inOut",
          onComplete: () => {
            window.location = destination;
          },
        }
      );
    }
  });
});

window.onpageshow = function (event) {
  console.log("this is the page load columns animation");
  if (event.persisted) {
    window.location.reload();
  }
};
