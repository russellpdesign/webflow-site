const pageBody = document.querySelector(".body");
const pageHeight = pageBody.scrollHeight;
const windowSize = window.innerHeight;
const pageOffset = pageHeight - windowSize;

function changeColor(e) {
  position = window.pageYOffset;
  console.log(`The position is equal to ${position}`);
  footerSwitch = Math.round(document.body.scrollHeight - windowSize * 1.5);
  console.log(`Footer switch is equal to ${footerSwitch}`);
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
