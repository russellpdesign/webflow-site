// this function animates from our vertical scrollbar section to our next section, along with animating that section
function movePhoto() {
    // this animation begins when the last one ends, so we are using some variables from that function here, but relabling them so it makes more sense
    const homeScrollSection = document.querySelector(".home-scroll-section.is-don");
    const currentPosition = window.scrollY;
    // To get height of section we measure the height of all the triggers (since it takes one trigger per one 100vh sticky section in this type of section)
    const triggers = document.querySelectorAll(".overview_trigger");
    const triggersHeight = triggers[0].getBoundingClientRect().height * triggers.length;
    // set that value to our sectionLength to make our code more readable
    const sectionLength = triggersHeight;
    const lastSectionsEnd = homeScrollSection.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
    const start = lastSectionsEnd + sectionLength;
    const viewportHeight = window.innerHeight;
    const stickySection = document.querySelector(".sticky-section.heroic-members-wrapper.reversed");
    const stickySectionHeight = stickySection.getBoundingClientRect().height;
    const sticky100vh =  document.querySelector(".sticky-section-100vh");
    const sticky100Height = sticky100vh.getBoundingClientRect().height;
    const end = start + (sticky100Height * 1.38);
    const homeScrollVisual = document.querySelector(".home-scroll-visual");
    const nav = document.querySelector("#navigation");
    const navHeight = parseInt(window.getComputedStyle(nav).height);
    const bigSection = document.querySelector(".introduction");
    const lastImage = document.querySelector(".home-scroll-img.is-r-pad.wider");
    const behindImageWrapper = document.querySelector(".home-scroll-img-behind-wrapper");
    const sectionBoothDesign = document.querySelector(".sticky-section.heroic-members-wrapper.reversed");
    const projectTextHeading = sectionBoothDesign.querySelector(".project-text-heading");
    const sectionBoothDesignBodyText = sectionBoothDesign.querySelector(".body-text.home-scroll");
    const sectionBoothDesignEyebrowText = sectionBoothDesign.querySelector(".section-header-text");
    const sectionBoothNumberText = sectionBoothDesign.querySelectorAll(".home-scroll-item-number");
    const leftSideImageHide = document.querySelector("#left-side-hide");
		const imageRevealSection = document.querySelector(".double-wide-reveal-img");
    const scaleDownImg = document.querySelector("#scale-down-img");
    // console.log(leftSideImageHide);
    
    // make sure the image stays in position before the animation starts or if it scrolls back to before it starts
    homeScrollVisual.style.transform = `translate3d(0%, 0, 0)`;
    behindImageWrapper.style.transform = "translate3d(-100%, 0, 0)";
    if (currentPosition < start ) { imageRevealSection.style.zIndex = "-1"; }
    
    // console.log(`start: ${start}, end: ${end}, sectionLength: ${sectionLength}, currentPosition: ${currentPosition}, viewportHeight: ${viewportHeight}, stickySectionHeight: ${stickySectionHeight}, sticky100Height: ${sticky100Height}` );

    if ( currentPosition > start ) {
        const percentageTraveled = currentPosition - start;
        // calculated scroll distance using chrome dev tools and give the sticky 100 section a background color and observing its position
        const wholeAmount = sticky100Height * 1.38;
        const xPercent = (percentageTraveled / wholeAmount) * 100;

        const imageTransformPercent = 100 - xPercent;
        // translates the image container from right side to left
        homeScrollVisual.style.transform = `translate3d(-${xPercent}%, 0, 0)`;
        behindImageWrapper.style.transform = `translate3d(-${imageTransformPercent}%, 0, 0)`;

        // transforms the opacity from 100% to o% so image behind can show through
        const opacityPercent = 100 - ((percentageTraveled / wholeAmount) * 100);
        lastImage.style.opacity = `${opacityPercent}%`;
        
        sectionBoothDesignBodyText.classList.remove("is-active");
        sectionBoothDesignEyebrowText.classList.remove("is-active");
        sectionBoothNumberText[0].classList.remove("is-active");
        
        
        // console.log(`percentageTraveled: ${percentageTraveled}, wholeAmount: ${wholeAmount}, opacityPercent: ${opacityPercent}, imageTransformPercent: ${imageTransformPercent}`);
    }

    if ( currentPosition > end ) {
    		lastImage.style.opacity = "0";
        homeScrollVisual.style.transform = "translate3d(-100%, 0, 0)";
        behindImageWrapper.style.transform = "translate3d(0%, 0, 0)";
        // force it in position once past (x = 100%, y is scrolldistance from end / viewportHeight since the image needs to scroll off screen as we scroll)
        const yDistanceTraveled = currentPosition - end;
        const yPercent = (yDistanceTraveled / viewportHeight) * 100;
        // homeScrollVisual.style.transform = `translate3d(-100%, -${yPercent}%, 0)`;
        // lastImage.style.opacity = '0%';
        
        sectionBoothDesignBodyText.classList.add("is-active");
        sectionBoothDesignEyebrowText.classList.add("is-active");
        sectionBoothNumberText[0].classList.add("is-active");
        projectTextHeading.classList.add("is-active");
        
        // console.log("Stop animating the image and allow it to be scrolled!");
        behindImageWrapper.style.opacity = "1";
        
    }

    // once a photo from the next section has overlayed our right to left traveling photo, we need to set its opacity to 0 so that the next sections sticky photo reveal works
    const photoRemoveCheckpoint = end + (viewportHeight * 1.5);
    if (currentPosition > photoRemoveCheckpoint ) {
        behindImageWrapper.style.opacity = "0";
        leftSideImageHide.style.opacity = "1";
    }
    
    // now we need to remove the left side sticky scroll container using opacity: 0 in time when the section below scrolls into place right unederneath it
    const rightSideRevealCheckpoint = end + (viewportHeight * 3); // 3 is amount of sections (not including spacer, since we use that moment to animate in right side)
    if ( currentPosition > rightSideRevealCheckpoint ) {
    // console.log("Animate text - remove is-active class on all")
    
    sectionBoothDesignBodyText.classList.remove("is-active");
    sectionBoothDesignEyebrowText.classList.remove("is-active");
    sectionBoothNumberText[0].classList.remove("is-active");
    projectTextHeading.classList.remove("is-active");
    
    scaleDownImg.style.height = "120%";
    
    const yPercent = 100 - (((currentPosition - rightSideRevealCheckpoint) / viewportHeight) * 100);
    
    const opacityPercent = 100 - (((currentPosition - rightSideRevealCheckpoint) / viewportHeight) * 100);
    leftSideImageHide.style.opacity = `${opacityPercent}%`;
    }
    
        
    if ( currentPosition > rightSideRevealCheckpoint + (viewportHeight * .9) ) {
    	console.log("I am revealing the image and waiting until the very top to switch the zed indexes");
    	imageRevealSection.style.zIndex = "3";
      }
    
    if ( currentPosition < rightSideRevealCheckpoint + (viewportHeight * .9) ) {
    imageRevealSection.style.zIndex = "-1";
    }
    
    // setting up our variables and trigger points for the beginning of the image scaling down to the ending point of the image scaling down
    const startScale = end + (viewportHeight * 4);
    const endScale = startScale + viewportHeight;
        
    const scaleDownImgContainer = document.querySelector(".big-absolute-img");
    const horizontalGridline = document.querySelector(".horizontal-gridline");
    const horizontalGridlineHeight = parseInt(window.getComputedStyle(horizontalGridline).height)

    const itemImageWrap = document.querySelector(".single-item-image-wrap");
    const imageWrapHeight = itemImageWrap.getBoundingClientRect().height;
    const imageWrapWidth = itemImageWrap.getBoundingClientRect().width;
    
    const heightEndValue = imageWrapHeight;
    const widthEndValue = imageWrapWidth;
    
    const endingImage = document.querySelector("#scale-down-img-after");

    
    scaleDownImgContainer.style.willChange = "transform, height, width";
    scaleDownImg.style.willChange = "transform, height, width";

    if( currentPosition < startScale ) {
        // console.log("set height and width to original value")
        scaleDownImgContainer.style.height = ``;
        scaleDownImgContainer.style.width = ``;
        scaleDownImgContainer.style.opacity = "1";
        itemImageWrap.style.opacity = "1";
        // scaleDownImg.style.height = "120%";
    }

    if ( currentPosition > startScale ) {
        // console.log("Animate image down in size, set opacity to 1");
        itemImageWrap.style.opacity = "1";
        
        const heightRange = viewportHeight - heightEndValue;
        const widthRange = window.innerWidth - widthEndValue;
        
        const heightChangePercent = (heightRange / viewportHeight) * 100;
        const widthChangePercent = (widthRange / window.innerWidth) * 100;
        
        const yPercent = ((currentPosition - startScale) / viewportHeight);
        
        const heightChangeFinalPercent = (heightEndValue / viewportHeight) * 100;
        const widthChangeFinalPercent = (widthEndValue / window.innerWidth) * 100;
        
        // const startingMinusEndingHeight = 100 - heightChangeFinalPercent;
        // const startingMinusEndingWidth = 100 - widthChangeFinalPercent;

        const heightPercent = 100 - (yPercent * heightChangePercent);
        const widthPercent = 100 - (yPercent* widthChangePercent);

        const scaleDownImgHeightStartingValue = 120; // in percentage
        const scaleDownImgHeightEndingValue = 150; // in percentage

        const maxHeightPercent = scaleDownImgHeightStartingValue - (yPercent * (-((scaleDownImgHeightEndingValue - scaleDownImgHeightStartingValue) / 100)) * 100);
        
        const statistics = {
        	yPercent: `${yPercent}`,
            heightChangeFinalPercent: `${heightChangeFinalPercent}`,
            widthChangeFinalPercent: `${widthChangeFinalPercent}`,
            heightChangePercent: `${heightChangePercent}`,
            widthChangePercent: `${widthChangePercent}`,
            heightRange: `${heightRange}`, 
            widthRange: `${widthRange}`,
            heightPercent: `${heightPercent}`,
            widthPercent: `${widthPercent}`,
            maxHeightPercent: maxHeightPercent,
            startScale: startScale,
            endScale: endScale,
            // startingMinusEndingHeight: `${startingMinusEndingHeight}`,
            // startingMinusEndingWidth: `${startingMinusEndingWidth}`
        }
        
        console.log("------ Scaling Image Section ------");
        console.table(statistics);

        // scale down the image container, failsafe fallback of opacity 1 if it doesnt animate perfectly to there from before or after
        scaleDownImgContainer.style.height = `${heightPercent}%`;
        scaleDownImgContainer.style.minHeight = `${heightChangeFinalPercent}%`;
        scaleDownImgContainer.style.width = `${widthPercent}%`;
				scaleDownImgContainer.style.minWidth = `${widthChangeFinalPercent}%`;

        // scale down image fitment / img inside the container
        scaleDownImg.style.height = `${maxHeightPercent}%`;
        
    }


    if ( currentPosition > endScale ) {
       // console.log("set width to their end point values, set opacity to 0");

        // scaleDownImgContainer.style.height = `${imageWrapHeight}px`;
        // scaleDownImgContainer.style.width = `${widthEndValue}px`;
        scaleDownImgContainer.style.opacity = "1";
        itemImageWrap.style.opacity = "1";
        scaleDownImg.style.height = "150%";
    }

}