function horizontalStickyScroll(e) {
    // div with class of horizontal-scroll-product, largest div for this animation
    const parentSection = document.querySelector("#service-scroll");
    const parentSectionDimensions = parentSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    // how much we have scrolled down the page vertically measured from the top of the body
    const currentPosition = window.scrollY;
    // top of section relative current position scrolled
    const sectionTopPosition = parentSectionDimensions.top + window.scrollY;
    // when section one's top intersects with the bottom of the viewport
    const sectionStart = sectionTopPosition - viewportHeight;
    const sectionEnd = parentSectionDimensions.bottom + currentPosition;
    const sectionHeight = `${sectionEnd}` - `${sectionStart}`;
    const sectionViewportHeights = sectionHeight / viewportHeight;
    const viewportDistTraveledToScrollAnimation = viewportHeight * 2;
    
    // viewport height units scrolled into section
    const viewportHeightUnitsScrolled = ( -sectionTopPosition / viewportHeight) * 100;
    // console.log(`Total viewport height units of section scrolled so far: ${viewportHeightUnitsScrolled}`);

    // when section two is fully in viewport
    const sectionStartTwo = sectionStart + (viewportHeight * 3);
    const sectionStartThree = sectionStartTwo + (viewportHeight * 3);

    const scrollTriggerOne = sectionStart + viewportDistTraveledToScrollAnimation;
    const scrollTriggerTwo = sectionStartTwo + viewportDistTraveledToScrollAnimation;
    const scrollTriggerThree = sectionStartThree + viewportDistTraveledToScrollAnimation;

    const viewheightTraveled = currentPosition - scrollTriggerOne;
    const viewheightTraveledTwo = currentPosition - scrollTriggerTwo;

    let percentVertDistTraveled = (viewheightTraveled / viewportHeight) * -100;
    let percentVertDistTraveledTwo = -100 + ((viewheightTraveledTwo / viewportHeight) * -100);

    const scrollItemsSection = document.querySelector("#product-anchor");
    
    // text animation triggers
    const textAnimationTriggerDistance = viewportHeight;
    const textAnimationTrigger = sectionStart + textAnimationTriggerDistance;
    const textAnimationTriggerTwo = sectionStartTwo + textAnimationTriggerDistance;
    const textAnimationTriggerThree = sectionStartThree + textAnimationTriggerDistance;

    const transformValue = scrollItemsSection.style.transform;
    const scaleDownImg = document.querySelector("#scale-down-img");
		
    // For Troubleshooting HORIZONTAL SCROLL SECTION USE THIS:
    const stats = {
        // general variables used to calculate things
        parentSectionDimensions: `${parentSectionDimensions}`,
        viewportHeight: `${viewportHeight}`,
        viewportWidth: `${viewportWidth}`,
        currentPosition: currentPosition,
        sectionTopPosition: sectionTopPosition,
        sectionEnd: sectionEnd,
        sectionHeight: sectionHeight,
        sectionViewportHeights: sectionViewportHeights,
        viewportDistTraveledToScrollAnimation: viewportDistTraveledToScrollAnimation,
        percentVertDistTraveled: percentVertDistTraveled,
        percentVertDistTraveledTwo: percentVertDistTraveledTwo,
        textAnimationTriggerDistance: textAnimationTriggerDistance,
        // our individual section trigger points
        sectionStart: sectionStart,
        textAnimationTrigger: textAnimationTrigger,
        scrollTriggerOne: scrollTriggerOne,
        sectionStartTwo: sectionStartTwo,
        textAnimationTriggerTwo: textAnimationTriggerTwo,
        scrollTriggerTwo: scrollTriggerTwo,
        sectionStartThree: sectionStartThree,
        textAnimationTriggerThree: textAnimationTriggerThree,
        scrollTriggerThree: scrollTriggerThree,
    }
    
		console.log("------ Horizontal Scroll Section ------");
    console.table(stats);
    
    // helper function to animate the dropdown rows individually using an array containing of all of them
    function addActive(domNodelist, toggleDesired, index) {
        if ( toggleDesired === "add" ) {
        domNodelist[index].classList.add("is-active");
        } if (toggleDesired === "remove" ) {
        domNodelist[index].classList.remove("is-active");
        }
    };

    if( (sectionTopPosition > viewportHeight && currentPosition < sectionStart) || ( -sectionTopPosition > sectionHeight ) ){
        return;
    } else {
        requestAnimationFrame(animateScroll);
    }

    // SECTION ONE
    // SECTION ONE
    // SECTION ONE
    // SECTION ONE

    function animateScroll() {

    // checking if the first section is fully in the viewport
    if (currentPosition > sectionStart && currentPosition < sectionStartTwo) {
    console.log("Section one is fully in view and i am scrolling in our section");
    // scaleDownImg.style.opacity = "0";
    // add opacity of our current section image that is actually in front of the previous
    }

    // section one scroll animation handling of snapping to section sticky parts
    if(`${currentPosition}` < `${scrollTriggerOne}` && ( `${percentVertDistTraveled}` < 10 || `${percentVertDistTraveled}` > -10 ) && currentPosition < sectionStartTwo) { 
    scrollItemsSection.style = "transform: translate3D(0, 0, 0)";
    console.log("I have scrolled past the trigger and the percentage needs to be forced to be 0!");
    }
    
    // section one text animation handling
    if(currentPosition > sectionStart && currentPosition < sectionStartTwo) {
        console.log("I scrolling the first section and waiting to pass the text animation trigger!");
      
        const section = document.querySelector("#product1");
        const productDesc = section.querySelector(".product-desc");
        const productDescActive = productDesc.querySelector("active");
        const smallTitle = section.querySelector(".medium-big-text");
        const bigTitle = section.querySelector(".big-text");
        const dropdownHeaderContainers = Array.from(section.querySelectorAll(".dropdown-header-container"));
      	console.log(dropdownHeaderContainers);
      
        // add active to start animation
        if( currentPosition >= textAnimationTrigger ) {
        console.log("I have passed the animationTrigger checkpoint and will animate the text now!");
        productDesc.classList.add("active");
        smallTitle.classList.add("active");
        bigTitle.classList.add("active");
        // animating in dropdown rows staggering there transforms
        setTimeout(addActive, 0, dropdownHeaderContainers, "add", 2);
        setTimeout(addActive, 100, dropdownHeaderContainers, "add", 1);
        setTimeout(addActive, 150, dropdownHeaderContainers, "add", 0);

        // setTimeout(dropdownHeaderContainers[1].classList.add("is-active"), 200);
        // setTimeout(dropdownHeaderContainers[2].classList.add("is-active"), 400);
        }
        
        // remove active to reverse animation
        if (currentPosition < textAnimationTrigger && currentPosition > sectionStart) {
        console.log("I have scrolled back above the trigger checkpoint and should animate back to original state.!");
        productDesc.classList.remove("active");
        smallTitle.classList.remove("active");
        bigTitle.classList.remove("active");
        // remove dropdown rows staggering there transforms
         setTimeout(addActive, 0, dropdownHeaderContainers, "remove", 2);
        setTimeout(addActive, 100, dropdownHeaderContainers, "remove", 1);
        setTimeout(addActive, 150, dropdownHeaderContainers, "remove", 0);
        
        }

    } // ends text animation portion
    
    // scrolling to section two handling
    const panelOne = document.querySelector("#product1");

    if(currentPosition > scrollTriggerOne && currentPosition < sectionStartTwo) {
        console.log("I should scroll to the second section now!");
        // trasnform the track
        scrollItemsSection.style = `transform: translate3D(${percentVertDistTraveled}%, 0, 0)`;

        // transform the first panel
        // let transformSectionPercentage = -percentVertDistTraveled / 10;
        // panelOne.style = `transform: translate3D(${transformSectionPercentage}%, 0, 0)`;
        // if(percentVertDistTraveled <= -100) { return; }
    }

    // if we have scroll back to behind our scrolltrigger, but our panel is not full aligned, force it with this
    if( currentPosition < scrollTriggerOne && transformValue === 'translate3d(0px, 0px, 0px)' ) {
        panelOne.style.transform = "translate3d(0px, 0px, 0px)";
        console.log("Panel one manually aligned flush left");
    }

    // if we've gone past our next frame, manually set transform to fix it there
    if(currentPosition > sectionStartTwo && `${percentVertDistTraveled}` < -90) {
    scrollItemsSection.style = "transform: translate3D(-100%, 0, 0)";
    console.log("I have scrolled near the second section or possibly tried to scroll passed it and am overriding the transform value to be fixed at 100%!");
    }



    // SECTION TWO
    // SECTION TWO
    // SECTION TWO
    // SECTION TWO


  
    // validating our section two is fully in view  
    if (currentPosition > sectionStartTwo && currentPosition < sectionStartThree) {
        console.log("Section two is fully in view and i am scrolling in our section");
    }

    // section two scroll animation handling of snapping to section sticky parts
    if( `${currentPosition}` < `${scrollTriggerTwo}` && currentPosition < sectionStartThree && currentPosition > scrollTriggerTwo) { 
        scrollItemsSection.style = "transform: translate3D(-100%, 0, 0)";
        console.log("I have scrolled past scrollTriggerTwo and the transform percentage needs to be forced to be -100%!");
    }

    // section two text animation handling
    if(currentPosition > sectionStartTwo && currentPosition < sectionStartThree) {
        console.log("I am scrolling the second section and waiting to pass the text animation trigger!");
      
        const section = document.querySelector("#product2");
        const productDesc = section.querySelector(".product-desc");
        const smallTitle = section.querySelector(".medium-big-text");
        const bigTitle = section.querySelector(".big-text");
      
        // add active to start animation
        if( currentPosition >= textAnimationTriggerTwo ) {
            console.log("I have passed textAnimationTriggerTwo checkpoint and will animate the text now!");
            productDesc.classList.add("active");
            smallTitle.classList.add("active");
            bigTitle.classList.add("active");
            
            productDesc.addEventListener("transitionstart", () => { document.body.classList.add("no-scroll") });
        		productDesc.addEventListener("transitionend", () => { document.body.classList.remove("no-scroll") });
        }
        
        // remove active to reverse animation
        if (currentPosition < textAnimationTriggerTwo && currentPosition > sectionStartTwo) {
            console.log("I have scrolled back above the textAnimationTriggerTwo checkpoint and should animate back to original state!");
            productDesc.classList.remove("active");
            smallTitle.classList.remove("active");
            bigTitle.classList.remove("active");
            
            productDesc.addEventListener("transitionstart", () => { document.body.classList.add("no-scroll") });
        		productDesc.addEventListener("transitionend", () => { document.body.classList.remove("no-scroll") });
        }

    } // ends text animation portion
    
    // scrolling to section three handling
    const panelTwo =  document.querySelector("#product2");

    if(currentPosition > scrollTriggerTwo && currentPosition < sectionStartThree && currentPosition > scrollTriggerTwo) {
        console.log("I should scroll to the thrid section now!");
        scrollItemsSection.style = `transform: translate3D(${percentVertDistTraveledTwo}%, 0, 0)`;

        // transform the second panel
        // let transformSectionPercentageTwo = ((percentVertDistTraveledTwo + 100) / 10) * -1;
        // panelTwo.style = `transform: translate3D(${transformSectionPercentageTwo}%, 0, 0)`;
        // if(percentVertDistTraveledTwo <= -200) { return; }
    }

     // if we have scroll back to behind our scrolltrigger, but our panel is not full aligned, force it with this
    if( currentPosition < scrollTriggerTwo && transformValue === 'translate3d(-100%, 0px, 0px)' ) {
        panelTwo.style.transform = "translate3d(0px, 0px, 0px)";
        console.log("Panel two manually aligned flush left");
    }
    
    // if we've gone past our next frame, manually set transform to fix it there
    if(currentPosition > sectionStartThree && percentVertDistTraveledTwo < -90) {
        scrollItemsSection.style = "transform: translate3D(-200%, 0, 0)";
        console.log("I have scrolled near the third section or possibly tried to scroll passed it and am overriding the transform value to be fixed at -200%!");
    }


    // SECTION THREE
    // SECTION THREE
    // SECTION THREE
    // SECTION THREE



 // section three text animation handling
    if(currentPosition > sectionStartThree && currentPosition < sectionEnd) {
      console.log("I am scrolling the third section and waiting to pass the text animation trigger!");
      
      const section = document.querySelector("#product3");
      const productDesc = section.querySelector(".product-desc");
      const smallTitle = section.querySelector(".medium-big-text");
      const bigTitle = section.querySelector(".big-text");
      
      // add active to start animation
      if( currentPosition >= textAnimationTriggerThree ) {
        console.log("I have passed textAnimationTriggerTwo checkpoint and will animate the text now!");
        productDesc.classList.add("active");
        smallTitle.classList.add("active");
        bigTitle.classList.add("active");
        
        productDesc.addEventListener("transitionstart", () => { document.body.classList.add("no-scroll") });
        productDesc.addEventListener("transitionend", () => { document.body.classList.remove("no-scroll") });
      }
        
      // remove active to reverse animation
      if (currentPosition < textAnimationTriggerThree && currentPosition > sectionStartThree) {
        console.log("I have scrolled back above the textAnimationTriggerTwo checkpoint and should animate back to original state!");
        productDesc.classList.remove("active");
        smallTitle.classList.remove("active");
        bigTitle.classList.remove("active")

        productDesc.addEventListener("transitionstart", () => { document.body.classList.add("no-scroll") });
        productDesc.addEventListener("transitionend", () => { document.body.classList.remove("no-scroll") });

      }

    } // ends text animation portion


// if we scroll past the section alltogether
if(currentPosition > sectionEnd) {
   console.log("Stop doing stuff!");
   }

	const stats = {
    viewportHeight : viewportHeight,
    viewportWidth: viewportWidth,
    currentPosition : currentPosition , 
    sectionTopPosition: sectionTopPosition,
    sectionStart : sectionStart, 
    sectionEnd : sectionEnd, 
    sectionHeight : sectionHeight, 
    sectionViewportHeights : sectionViewportHeights,
    viewportDistTraveledToScrollAnimation: viewportDistTraveledToScrollAnimation,
    sectionStartTwo: sectionStartTwo,
    sectionStartThree : sectionStartThree,
    scrollTriggerOne : scrollTriggerOne,
    scrollTriggerTwo: scrollTriggerTwo,
    scrollTriggerThree: scrollTriggerThree,
    textAnimationTrigger: textAnimationTrigger,
    textAnimationTriggerTwo: textAnimationTriggerTwo,
    percentVertDistTraveled : percentVertDistTraveled,
    percentVertDistTraveledTwo: percentVertDistTraveledTwo,
    viewheightTraveled: viewheightTraveled,
    viewheightTraveledTwo: viewheightTraveledTwo,
    transformValue: transformValue
    };
    
    // console.table(stats);
  
    }  // ends animateScroll function

} // end of entire function

// end horizontal sticky scroll animation
// end horizontal sticky scroll animation
// end horizontal sticky scroll animation