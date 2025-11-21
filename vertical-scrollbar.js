function moveScrollBar() {

    // DOM ELEMENTS
    const elementToAnimateClassName = "vertical-progress-bar-inside";
    const elementToAnimate = document.querySelector(`.${elementToAnimateClassName}`);
    const triggers = document.querySelectorAll(".overview_trigger");

    // DISTANCES AND TRIGGER POINTS
    // since our element is sticky, we need to figure out the scroll height of the section by targeting the overview_trigger elements and adding up their cumulative height
    const triggersHeight = triggers[0].getBoundingClientRect().height * triggers.length;
    const currentPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    // scrollbar should animate when the top of the section reaches the top of the viewport
    const startTrigger = triggers[0].getBoundingClientRect().top - viewportHeight - document.body.getBoundingClientRect().top;
    // scrollbar should stop animating when the top of our last trigger reaches the top of the viewport
    const endTrigger = startTrigger + triggersHeight;

    // ANIMATION FORMULAS
    const yPercent = (((currentPosition - startTrigger) / (endTrigger - startTrigger)) * 100) * 2;

    /* to troubleshoot issues with this script, use the following

    const vertScrollBarStats = {
        elementToAnimateClassName: `${elementToAnimateClassName}`,
        triggers: `${triggers}`,
        triggersHeight: `${triggersHeight}`,
        currentPosition: `${currentPosition}`,
        viewportHeight: `${viewportHeight}`,
        startTrigger: `${startTrigger}`,
        endTrigger: `${endTrigger}`,
        yPercent: `${yPercent}`,
    }

    console.log("------ Vertical Scrolling Slider Bar ------");
    console.table(vertScrollBarStats);
    */

        // scrollbar handling
        if ( currentPosition >= startTrigger && currentPosition <= endTrigger ) {
        elementToAnimate.style.transform = `translate3d(0, ${yPercent}%, 0)`
        }

        // outside of the scroll event range where we transform our bar, we can manually force our values to their outter transform values since they often skip frames and start or end at odd decimals
        if ( currentPosition < startTrigger ) {
        elementToAnimate.style.transform = "translate3d(0, 0%, 0)";
        }
        if( currentPosition > endTrigger) {
        elementToAnimate.style.transform = "translate3d(0, 200%, 0)";
        }
}