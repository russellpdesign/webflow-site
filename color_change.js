const pageBody = document.querySelector(".body");
const pageHeight = pageBody.scrollHeight;
const pageOffset = pageHeight - windowSize;
let windowSize = window.innerHeight;
let footerSwitch = Math.round(document.body.scrollHeight - windowSize * 1.5);

function getSpecs(e) {
  // re-get values for window height and when are animation gets tripped for the footer section
  return [
    windowSize,
    footerSwitch,
    console.log(
      `The window was resized, so now the windowSize is equal to ${windowSize} and the footerSwitch is equal to ${footerSwitch}`
    ),
  ];
}

function changeColor(e) {
  getSpecs();

  console.log(
    `From the changeColor function, the position is equal to ${position}`
  );
  console.log(
    `From the changeColor function, the footer switch is equal to ${footerSwitch}`
  );

  let position = window.pageYOffset;

  heroSwitch = Math.round(window.innerHeight * 0.4);
  if (position > heroSwitch) {
    pageBody.classList.add("u-theme-dark");
    console.log("the dark theme has been triggered!");
  }
  if ((position > footerSwitch) | (position < heroSwitch)) {
    pageBody.classList.remove("u-theme-dark");
    console.log("The base mode has been triggered!");
  }
}

window.addEventListener("scroll", changeColor);
window.addEventListener("resize", getSpecs);
