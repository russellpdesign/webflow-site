// handles animation logic
function imageScaleDown() {
    currentPosition;
    console.log(`inside of imageScaleDown function our currentPosition is: ${currentPosition}`);
    // setting up our variables and trigger points for the beginning of the image scaling down to the ending point of the image scaling down
    const triggers = document.querySelectorAll(".overview_trigger");
    const triggersHeight = triggers[0].getBoundingClientRect().height * triggers.length;
    // set that value to our sectionLength to make our code more readable
    const sectionLength = triggersHeight;
    const homeScrollSection = document.querySelector(".home-scroll-section.is-don");
    const lastSectionsEnd = homeScrollSection.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
    const start = lastSectionsEnd + sectionLength;
    const sticky100vh =  document.querySelector(".sticky-section-100vh");
    const sticky100Height = sticky100vh.getBoundingClientRect().height;
    const end = start + (sticky100Height * 1.38);
    const viewportHeight = window.innerHeight;

    const startScale = end + (viewportHeight * 4);
    const endScale = startScale + viewportHeight;
        
    const scaleDownImg = document.querySelector("#scale-down-img");
    const scaleDownImgContainer = document.querySelector(".big-absolute-img");
    const horizontalGridline = document.querySelector(".horizontal-gridline");
    const horizontalGridlineHeight = parseInt(window.getComputedStyle(horizontalGridline).height)

    const itemImageWrap = document.querySelector(".single-item-image-wrap");
    const imageWrapHeight = itemImageWrap.getBoundingClientRect().height;
    const imageWrapWidth = itemImageWrap.getBoundingClientRect().width;
    
    const heightEndValue = imageWrapHeight;
    const widthEndValue = imageWrapWidth;

    const endingImage = document.querySelector("#scale-down-img-after");

    const heightRange = viewportHeight - heightEndValue;
    const widthRange = window.innerWidth - widthEndValue;
        
    const heightChangePercent = (heightRange / viewportHeight) * 100;
    const widthChangePercent = (widthRange / window.innerWidth) * 100;
        
    const yPercent = ((currentPosition - startScale) / viewportHeight);
        
    const heightChangeFinalPercent = (heightEndValue / viewportHeight) * 100;
    const widthChangeFinalPercent = (widthEndValue / window.innerWidth) * 100;

    const scaleDownImgContainerHeightPercent = 100 - (yPercent * heightChangePercent);
    const scaleDownImgContainerWidthPercent = 100 - (yPercent * widthChangePercent);

    // these are derived from the before images height and the ending value of the scaled down images height css property
    const scaleDownImgHeightStartingValue = 120; // in percentage
    const scaleDownImgHeightEndingValue = 150; // in percentage

    const scaleDownImgHeightPercent = scaleDownImgHeightStartingValue - (yPercent * (-((scaleDownImgHeightEndingValue - scaleDownImgHeightStartingValue) / 100)) * 100);

    // cleaner formula but not as readable for troubleshooting
    const scaleDownImgHeightPercentSimplified = scaleDownImgHeightStartingValue + yPercent * (scaleDownImgHeightEndingValue - scaleDownImgHeightStartingValue);

    const scaleDownImgContainerWillChangeSettings = window.getComputedStyle(scaleDownImgContainer).willChange;
    const scaleDownImgWillChangeSettings = window.getComputedStyle(scaleDownImg).willChange;

    const statistics = {
        currentPosition: `${currentPosition}`,
        yPercent: `${yPercent}`,
        heightChangeFinalPercent: `${heightChangeFinalPercent}`,
        widthChangeFinalPercent: `${widthChangeFinalPercent}`,
        heightChangePercent: `${heightChangePercent}`,
        widthChangePercent: `${widthChangePercent}`,
        heightRange: `${heightRange}`, 
        widthRange: `${widthRange}`,
        scaleDownImgContainerHeightPercent: `${scaleDownImgContainerHeightPercent}`,
        scaleDownImgContainerWidthPercent: `${scaleDownImgContainerWidthPercent}`,
        scaleDownImgHeightPercent: scaleDownImgHeightPercent,
        startScale: startScale,
        endScale: endScale,
        scaleDownImgHeightPercentSimplified: `${scaleDownImgHeightPercentSimplified}`,
        scaleDownImgContainerWillChangeSettings: scaleDownImgContainerWillChangeSettings,
        scaleDownImgWillChangeSettings: scaleDownImgWillChangeSettings,
        testingAddingWillChangeBeforeAndAfters: scaleDownImgWillChangeSettings + "transform, height, width",
    }

    console.log("------ Scaling Image Section ------");
    console.table(statistics);

    // if our location is before our scaling transformation, ensure our style properties are set to their pre-transformation settings
    // this is mainly to handle the page if we scroll back up before our scale transformation
    if( currentPosition < startScale ) {
        scaleDownImgContainer.style.height = ``;
        scaleDownImgContainer.style.width = ``;
        scaleDownImgContainer.style.opacity = "1";
        itemImageWrap.style.opacity = "1";
        scaleDownImg.style.height = "120%";
        scaleDownImgContainer.style.willChange = "transform, height, width";
        scaleDownImg.style.willChange = "transform, height, width";
    }

    if ( currentPosition > startScale ) {
        // scale down the image container, failsafe fallback of opacity 1 if it doesnt animate perfectly to there from before or after
        scaleDownImgContainer.style.height = `${scaleDownImgContainerHeightPercent}%`;
        scaleDownImgContainer.style.minHeight = `${heightChangeFinalPercent}%`;
        scaleDownImgContainer.style.width = `${scaleDownImgContainerWidthPercent}%`;
		scaleDownImgContainer.style.minWidth = `${widthChangeFinalPercent}%`;

        // scale down image fitment / img inside the container
        scaleDownImg.style.height = `${scaleDownImgHeightPercent}%`;
        endingImage.style.opacity = "0";
    }


    if ( currentPosition > endScale ) {
       // console.log("set width to their end point values, set opacity to 0");
        scaleDownImgContainer.style.height = `${heightChangeFinalPercent}%`;
        scaleDownImgContainer.style.width = `${widthChangeFinalPercent}%`;
        scaleDownImgContainer.style.opacity = "1";
        scaleDownImg.style.height = "150%";
    }

    if ( currentPosition > endScale + (viewportHeight * .5) ) {
       // remove our before scaling image
        scaleDownImg.style.opacity = "0";
        // replace with our after img
        endingImage.style.opacity = "1";
    } else { 
        // or add it back behind
        scaleDownImg.style.opacity = "1";
    }

    // reset ticking back to false
    ticking = false;
}

function imageScaleDownScrollHandler(eventObject) {
    currentPosition = window.scrollY;

    if(!ticking) {
        window.requestAnimationFrame(imageScaleDown);
        ticking = true;
    }
};
