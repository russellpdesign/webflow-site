function animateTextElements() {

    const progressBarInside = document.querySelector(".vertical-progress-bar-inside");
    const homeScrollSection = document.querySelector(".home-scroll-section.is-don");
    // const currentPosition = window.scrollY;
    // To get height of section we measure the height of all the triggers (since it takes one trigger per one 100vh sticky section in this type of section)
    const triggers = document.querySelectorAll(".overview_trigger");
    const triggersHeight = triggers[0].getBoundingClientRect().height * triggers.length;
    // set that value to our sectionLength to make our code more readable
    const sectionLength = triggersHeight;
    const viewportHeight = window.innerHeight;
    const start = homeScrollSection.getBoundingClientRect().top + currentPosition;
    const nav = document.querySelector("#navigation");
    const navHeight = parseInt(window.getComputedStyle(nav).height);
    const sectionBottom = homeScrollSection.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
    const titleItems = document.querySelectorAll(".home-scroll-title");
    const textItems = document.querySelectorAll(".body-text.home-scroll")
    const numberItems = document.querySelectorAll(".home-scroll-item-number");
    const imgItems = document.querySelectorAll(".home-scroll-img-item");
    const sectionHeader = document.querySelector(".section-header-text");
    const scrollbar = document.querySelector(".vertical-progress-bar");
    const end = start + sectionLength;
    const secondStart = start + viewportHeight;
    const thirdStart = start + (viewportHeight *2);

    const stats = {
      start: start,
      secondStart: secondStart,
      thirdStart: thirdStart,
      end: end,
    }

    console.log("------ Scrollbar Section Text Animations ------");
    console.table(stats)

    if ( currentPosition < start ) {
    titleItems.forEach(item => { item.classList.remove("is-active") });
    textItems.forEach(item => { item.classList.remove("is-active") });
    numberItems.forEach(item => { item.classList.remove("is-active") });
    imgItems.forEach(item => { item.classList.remove("is-active") });
    sectionHeader.classList.remove("is-active");
    }

	if ( currentPosition >= start && currentPosition <= secondStart ) {
    // console.log("Animate our section 1 text in or out");
    sectionHeader.classList.add("is-active");
    
    titleItems[0].classList.add("is-active");
    textItems[0].classList.add("is-active");
    numberItems[0].classList.add("is-active");
    imgItems[0].classList.add("is-active");
    
    titleItems[1].classList.remove("is-active");
    textItems[1].classList.remove("is-active");
    numberItems[1].classList.remove("is-active");
    imgItems[1].classList.remove("is-active");
    }
    
    if ( currentPosition >= secondStart && currentPosition <= thirdStart ) {
    titleItems[0].classList.remove("is-active");
    textItems[0].classList.remove("is-active");
    numberItems[0].classList.remove("is-active");
    imgItems[0].classList.remove("is-active");
    
    titleItems[1].classList.add("is-active");
    textItems[1].classList.add("is-active");
    numberItems[1].classList.add("is-active");
    imgItems[1].classList.add("is-active");
    
    titleItems[2].classList.remove("is-active");
    textItems[2].classList.remove("is-active");
    numberItems[2].classList.remove("is-active");
    imgItems[2].classList.remove("is-active");
    }
    
    if ( currentPosition >= thirdStart && currentPosition <= end ) {
    titleItems[1].classList.remove("is-active");
    textItems[1].classList.remove("is-active");
    numberItems[1].classList.remove("is-active");
    imgItems[1].classList.remove("is-active");
    
    titleItems[2].classList.add("is-active");
    textItems[2].classList.add("is-active");
    numberItems[2].classList.add("is-active");
    imgItems[2].classList.add("is-active");
    
    sectionHeader.classList.add("is-active");
    
    scrollbar.classList.remove("is-gone");
    }
    
    if( currentPosition > end) {
    titleItems[2].classList.remove("is-active");
    textItems[2].classList.remove("is-active");
    numberItems[2].classList.remove("is-active");
    scrollbar.classList.add("is-gone");
    imgItems[2].classList.add("is-active");
    sectionHeader.classList.remove("is-active");
    
    progressBarInside.style.transform = "translate3d(0, 200%, 0)";
    }

};

/// OLD CODE

/*

function moveBar() {
const progressBarInside = document.querySelector(".vertical-progress-bar-inside");
const homeScrollSection = document.querySelector(".home-scroll-section.is-don");
const currentPosition = window.scrollY;
// To get height of section we measure the height of all the triggers (since it takes one trigger per one 100vh sticky section in this type of section)
const triggers = document.querySelectorAll(".overview_trigger");
const triggersHeight = triggers[0].getBoundingClientRect().height * triggers.length;
// set that value to our sectionLength to make our code more readable
const sectionLength = triggersHeight;
const viewportHeight = window.innerHeight;
const start = homeScrollSection.getBoundingClientRect().top + currentPosition;
const nav = document.querySelector("#navigation");
const navHeight = parseInt(window.getComputedStyle(nav).height);
const sectionBottom = homeScrollSection.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
const titleItems = document.querySelectorAll(".home-scroll-title");
const textItems = document.querySelectorAll(".body-text.home-scroll")
const numberItems = document.querySelectorAll(".home-scroll-item-number");
const imgItems = document.querySelectorAll(".home-scroll-img-item");
const sectionHeader = document.querySelector(".section-header-text");
const scrollbar = document.querySelector(".vertical-progress-bar");
const end = start + sectionLength;
const secondStart = start + viewportHeight;
const thirdStart = start + (viewportHeight *2);


const vertScrollBarStats = {
  start: `${start}`, 
  sectionLength: `${sectionLength}`, 
  currentPosition: `${currentPosition}`, 
  navHeight: `${navHeight}`, 
  end: `${end}`, 
  sectionBottom: `${sectionBottom}`, 
  viewportHeight: `${viewportHeight}`,
}
	
  console.log("------ Vertical Scrolling Slider Bar ------");
  console.table(vertScrollBarStats);

// scrollbar handling
    if ( start <= currentPosition && currentPosition <= end ) {
    console.log("Animate scroll bar!");
    const yPercent = (((currentPosition - start) / (end - start)) * 100) * 2;
    console.log(`${yPercent}`);
    progressBarInside.style.transform = `translate3d(0, ${yPercent}%, 0)`
    }

    // outside of the scroll event range where we transform our bar, we can manually force our values to their outter transform values since they often skip frames and start or end at odd decimals
    if ( currentPosition < start) {
    progressBarInside.style.transform = "translate3d(0, 0%, 0)";
    }
    if( currentPosition > end) {
    progressBarInside.style.transform = "translate3d(0, 200%, 0)";
    }

// text animation handling

    if ( currentPosition < start ) {
    titleItems.forEach(item => { item.classList.remove("is-active") });
    textItems.forEach(item => { item.classList.remove("is-active") });
    numberItems.forEach(item => { item.classList.remove("is-active") });
    imgItems.forEach(item => { item.classList.remove("is-active") });
    sectionHeader.classList.remove("is-active");
    }

		if ( currentPosition >= start && currentPosition <= secondStart ) {
    // console.log("Animate our section 1 text in or out");
    sectionHeader.classList.add("is-active");
    
    titleItems[0].classList.add("is-active");
    textItems[0].classList.add("is-active");
    numberItems[0].classList.add("is-active");
    imgItems[0].classList.add("is-active");
    
    titleItems[1].classList.remove("is-active");
    textItems[1].classList.remove("is-active");
    numberItems[1].classList.remove("is-active");
    imgItems[1].classList.remove("is-active");
    }
    
    if ( currentPosition >= secondStart && currentPosition <= thirdStart ) {
    titleItems[0].classList.remove("is-active");
    textItems[0].classList.remove("is-active");
    numberItems[0].classList.remove("is-active");
    imgItems[0].classList.remove("is-active");
    
    titleItems[1].classList.add("is-active");
    textItems[1].classList.add("is-active");
    numberItems[1].classList.add("is-active");
    imgItems[1].classList.add("is-active");
    
    titleItems[2].classList.remove("is-active");
    textItems[2].classList.remove("is-active");
    numberItems[2].classList.remove("is-active");
    imgItems[2].classList.remove("is-active");
    }
    
    if ( currentPosition >= thirdStart && currentPosition <= end ) {
    titleItems[1].classList.remove("is-active");
    textItems[1].classList.remove("is-active");
    numberItems[1].classList.remove("is-active");
    imgItems[1].classList.remove("is-active");
    
    titleItems[2].classList.add("is-active");
    textItems[2].classList.add("is-active");
    numberItems[2].classList.add("is-active");
    imgItems[2].classList.add("is-active");
    
    sectionHeader.classList.add("is-active");
    
    scrollbar.classList.remove("is-gone");
    }
    
    if( currentPosition > end) {
    titleItems[2].classList.remove("is-active");
    textItems[2].classList.remove("is-active");
    numberItems[2].classList.remove("is-active");
    scrollbar.classList.add("is-gone");
    imgItems[2].classList.add("is-active");
    sectionHeader.classList.remove("is-active");
    
    progressBarInside.style.transform = "translate3d(0, 200%, 0)";
    }

};

const throttledScrollHandler = throttle(moveBar, 15); // Throttle to 100ms


document.addEventListener("scroll", throttledScrollHandler);
window.addEventListener("resize", moveBar);
document.addEventListener("DOMContentLoaded", moveBar);

*/