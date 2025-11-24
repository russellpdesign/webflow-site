function imageScaleDown() {
    // setting up our variables and trigger points for the beginning of the image scaling down to the ending point of the image scaling down
    const currentPosition = window.scrollY;
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
    const start = lastSectionsEnd + sectionLength;
    const end = start + (sticky100Height * 1.38);

    
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

        // cleaner formula but not as readable for troubleshooting
        const maxHeightPercentSimplified = scaleDownImgHeightStartingValue + yPercent * (scaleDownImgHeightEndingValue - scaleDownImgHeightStartingValue);

        
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