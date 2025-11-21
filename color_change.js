// BODY COLOR CHANGE ANIMATION
function changeColor(e) {
    //declare top level function variables

    const pageBody = document.querySelector(".body");
    // we need the total height of the page
    let pageHeight = pageBody.scrollHeight;
    // we need our viewport height
    let viewportHeight = window.innerHeight;
    // the total scroll height of the page minus 100% viewport height
    let pageOffset = pageHeight - viewportHeight;
    // the pixel distance scrolled from the top of the page
    let position = window.scrollY;

    // Trigger point variables defined for Hero Section and Color Change scroll animations

    // 10% from top of page
    let heroSwitch = Math.round(viewportHeight * 0.1);
    // 175% viewport height relative to bottom of the page
    let footerSwitch = Math.round(pageHeight - viewportHeight * 1.75);
    
    // since our header is not available to target when the page loads, we need to grab it once we scroll, as soon as we scroll, we are checking to see if we should change colors
    // these are all the elements that what will shift color when we go from light to dark mode
    const gridline1 = document.querySelectorAll(".middle-grid.is-light");
    const gridline2 = document.querySelectorAll(".horizontal-gridline");
    const aboutBlurb = document.querySelectorAll(".about-blurb");
    const bodyText = document.querySelectorAll(".body-text");
    const servicesHeading = document.querySelectorAll(".services-heading");
    const bioHeading = document.querySelectorAll(".bio-heading");
    const servicesLi = document.querySelectorAll(".services-li");
    const specialtiesText = document.querySelectorAll(".specialties-heading");
    const numberText = document.querySelectorAll(".numeral");
    const aboutProjectLink = document.querySelectorAll(".view-proj-about");
    const headerText = document.querySelector(".about-header-text");
    // const footerDiv = document.querySelector(".grid-footer.is-about");
    
    // conditional statements for when we acitvate classes and switch colors
    // the transitions are controlled via active class specific CSS style rules which have been defined ia a code embed in webflow (located at the top of the page as our first element in the body)
    
    // if our scroll distance from the top has gone past where our hero trip line is AND we have not yet scrolled past our footer tripline, we can activate our dark mode
    if ((position > heroSwitch) && (position < footerSwitch)) {
        pageBody.classList.add("active");
        headerText.classList.add("active");
        gridline1.forEach((gridline) => { gridline.classList.add("active") });
        gridline2.forEach((gridline) => { gridline.classList.add("active") });
        aboutBlurb.forEach((blurb) => { blurb.classList.add("active") });
        bodyText.forEach((bodyTextElement) => { bodyTextElement.classList.add("active") });
        servicesHeading.forEach((header) => { header.classList.add("active") });
        bioHeading.forEach((header) => { header.classList.add("active") });
        servicesLi.forEach((listItem) => { listItem.classList.add("active") });
        specialtiesText.forEach((heading) => { heading.classList.add("active") });
        numberText.forEach((numeral) => { numeral.classList.add("active") });
        aboutProjectLink.forEach((link) => { link.classList.add("active") });

        
        // console.log("the dark theme has been triggered!");
    } // ends if statement for triggering dark mode
    
    // if we have scrolled back up, we reactivate the light mode OR if we scroll down past our footerSwitch trip line
    if ((position > footerSwitch) | (position < heroSwitch)) {
        pageBody.classList.remove("active");
        headerText.classList.remove("active");
        bodyText.forEach((bodyTextElement) => { bodyTextElement.classList.remove("active") });
        gridline1.forEach((gridline) => { gridline.classList.remove("active") });
        gridline2.forEach((gridline) => { gridline.classList.remove("active") });
        
        // console.log("The base mode has been triggered!");
    } // ends if statement for triggering light mode
} // ends changeColor function