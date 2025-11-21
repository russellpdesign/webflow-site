// function throttle(func, delay) {
//   let timeoutId;
//   let lastArgs;
//   let lastThis;
//   let lastExecTime = 0;

//   return function(...args) {
//     lastArgs = args;
//     lastThis = this;
//     const currentTime = Date.now();

//     if (currentTime - lastExecTime >= delay) {
//       lastExecTime = currentTime;
//       func.apply(lastThis, lastArgs);
//     } else if (!timeoutId) {
//       timeoutId = setTimeout(() => {
//         lastExecTime = Date.now();
//         func.apply(lastThis, lastArgs);
//         timeoutId = null;
//       }, delay - (currentTime - lastExecTime));
//     }
//   };
// }

function moveScrollBar() {

    const progressBarInside = document.querySelector(".vertical-progress-bar-inside");
    // since our element is sticky, we need to figure out the scroll height of the section by targeting the overview_trigger elements and adding up their cumulative height
    const triggers = document.querySelectorAll(".overview_trigger");
    const triggersHeight = triggers[0].getBoundingClientRect().height * triggers.length;
    const currentPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    // scrollbar should animate when the top of the section reaches the top of the viewport
    const startTrigger = triggers[0].getBoundingClientRect().top + currentPosition;
    // scrollbar should stop animating when the top of our last trigger reaches the top of the viewport
    const endTrigger = triggers[2].getBoundingClientRect().top + currentPosition;

    console.log("------ Vertical Scrolling Slider Bar ------");
    console.table(vertScrollBarStats);

        // scrollbar handling
        if ( currentPosition >= startTrigger && currentPosition <= endTrigger ) {
        console.log("Animate scroll bar!");
        const yPercent = (((currentPosition - startTrigger) / (endTrigger - startTrigger)) * 100) * 2;
        console.log(`${yPercent}`);
        progressBarInside.style.transform = `translate3d(0, ${yPercent}%, 0)`
        }

        // outside of the scroll event range where we transform our bar, we can manually force our values to their outter transform values since they often skip frames and start or end at odd decimals
        if ( currentPosition < startTrigger ) {
        progressBarInside.style.transform = "translate3d(0, 0%, 0)";
        }
        if( currentPosition > endTrigger) {
        progressBarInside.style.transform = "translate3d(0, 200%, 0)";
        }
}

const throttledScrollHandler = throttle(moveScrollBar, 15); // Throttle to 100ms


document.addEventListener("scroll", moveScrollBar);
window.addEventListener("resize", moveScrollBar);
document.addEventListener("DOMContentLoaded", moveScrollBar);