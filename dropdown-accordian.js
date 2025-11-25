// this document only controls how dropdown works and checks if we are in the section where it is allowed to work
// if we are not in our section, we collapse all rows
  const headerContainerClassName = "dropdown-header-container";
  const dropdownsRowsClassName = "dropdown-row-container";
  const dropdownWrapperClassName = "dropdown-wrapper";
  const plusSignContainerClassName = "plus-sign-container";
  const plusSignVerticalPartClassName = "vertical-plus-sign";
  const headerContainers = Array.from(document.querySelectorAll(`.${headerContainerClassName}`));
  const rows = Array.from(document.querySelectorAll(`.${dropdownsRowsClassName}`));
  const plusSignContainers = Array.from(document.querySelectorAll(`.${plusSignContainerClassName}`));
  const plusSignVerts = Array.from(ocument.querySelectorAll(`.${plusSignVerticalPartClassName}`));

      // Container Settings CLOSE
      const containerCloseHeightSettings = `5vw`;
      const containerCloseTransitionSettings = "height 0.5s ease";

      // TextBox Settings CLOSE
      const textCloseHeightSettings = "0%";
      const textCloseTransitionSettings = "height 0.4s ease";
      
      // plus sign CLOSE
      const plusSignCloseTransformSettings = "rotate3D(0, 0, 1, 0deg)";
      const plusSignCloseTransitionSettings = "transform .5s ease";
      const vertPlusPartCloseTransformSettings = "rotate3D(0, 0, 1, 0deg)";
      const vertPlusPartCloseTransitionSettings = "transform .5s ease";

function chooseFunction() {
  const currentPosition = window.scrollY;
  const start = document.querySelector("#service-scroll").getBoundingClientRect().top + currentPosition ;
  console.log(start);

  if (currentPosition > start) {
    console.log("the dropdown should now be functional")
    headerContainers.forEach(headerRow => addEventListener("click", startDropdown));
   // startDropdown(e);
  } 
  
  if (currentPosition < start) {
    console.log("the dropdown should collapse all open rows")
    rows.forEach((row) => { row.style.height = containerCloseHeightSettings });
    rows.forEach((row) => { row.style.transition = containerCloseTransitionSettings });
    plusSignContainers.forEach((container) => { container.style.transform = plusSignCloseTransformSettings});
    plusSignContainers.forEach((container) => { container.style.transition = plusSignCloseTransitionSettings});
    plusSignVerts.forEach((vert) => { vert.style.transform = vertPlusPartCloseTransformSettings });
    lusSignVerts.forEach((vert) => { vert.style.transition = vertPlusPartCloseTransitionSettings });

    // bodyTextContainer.style.height = textCloseHeightSettings
    // bodyTextContainer.style.transition = textCloseTransitionSettings;
    dropdownIsOpen = false;
    lastRowClicked = "";
  }
}
  
function startDropdown(e) {
    // classes representing our various clickable items
    //  NOTE these are not querySelectors


    console.log(headerContainers, rows);
    let lastRowClicked;
    // console.log(lastRowClicked);
    let dropdownIsOpen = false;

    const clickedElement = e.target?.offsetParent;
    console.log(clickedElement);
    let currentRowClicked = headerContainers.indexOf(clickedElement);
    console.log(currentRowClicked);
    const parentRow = clickedElement?.offsetParent;
    console.log(parentRow)
    const parentRowIndex = rows.indexOf(parentRow);
    console.log(parentRowIndex);
    // if our target is not the dropdown, we dont run the function)
    let result = parentRow?.classList.contains(dropdownsRowsClassName);
    let resultTwo = parentRow?.classList.contains(headerContainerClassName);
    let resultThree = parentRow?.classList.contains(dropdownWrapperClassName);
    // let resultOption2 = e.target.offsetPare.nt?.classList.contains(dropdownRowsClassName);
    console.log(result, resultTwo, resultThree);

    if ( result || resultTwo || resultThree ) {
      e.preventDefault();
      // our dropdown logic

      // console.log(lastRowClicked, currentRowClicked);
      
      const bodyText = parentRow.querySelector(".dropdown-body-text");
      const bodyTextHeight = bodyText.getBoundingClientRect().height;
      const bodyTextContainer = parentRow.querySelector(".dropdown-body-text-container");
      const plusSign = parentRow.querySelector(".plus-sign-container");
      const vertPlusPart = parentRow.querySelector(".vertical-plus-sign");

      // Container Settings OPEN
      const containerOpenHeightSettings = `calc(5vw + ${bodyTextHeight}px`;
      const containerOpenTransitionSettings = "height 0.5s ease";

      // TextBox Settings OPEN
      const textOpenHeightSettings = "100%";
      const textOpenTransitionSettings = "height 0.5s ease";
      
      // plus sign OPEN
      const plusSignOpenTransformSettings = "rotate3D(0, 0, 1, 180deg)";
      const plusSignOpenTransitionSettings = "transform .5s ease";
      const vertPlusPartOpenTransformSettings = "rotate3D(0, 0, 1, 90deg)";
      const vertPlusPartOpenTransitionSettings = "transform .5s ease";
      
      const otherItemsArray = rows.filter(item => item !== rows[currentRowClicked]);
      console.log(otherItemsArray);

      function openAccordianItem() {
              parentRow.style.height = containerOpenHeightSettings;
              parentRow.style.transition = containerOpenTransitionSettings;
              plusSign.style.transform = plusSignOpenTransformSettings;
              plusSign.style.transition = plusSignOpenTransitionSettings;
              vertPlusPart.style.transform = vertPlusPartOpenTransformSettings;
              vertPlusPart.style.transition = vertPlusPartOpenTransitionSettings;
              // bodyTextContainer.style.height = textOpenHeightSettings;
              // bodyTextContainer.style.transition = textOpenTransitionSettings;
              dropdownIsOpen = true;
      }

      function closeAccordianItem() {
            parentRow.style.height = containerCloseHeightSettings;
            parentRow.style.transition = containerCloseTransitionSettings;
            plusSign.style.transform = plusSignCloseTransformSettings;
            plusSign.style.transition = plusSignCloseTransitionSettings;
            vertPlusPart.style.transform = vertPlusPartCloseTransformSettings;
            vertPlusPart.style.transition = vertPlusPartCloseTransitionSettings;
            // bodyTextContainer.style.height = textCloseHeightSettings
            // bodyTextContainer.style.transition = textCloseTransitionSettings;
            dropdownIsOpen = false;
      }


      
      // console.log(otherItemsArray);


      if ( lastRowClicked == currentRowClicked ) {
            // console.log("I clicked the same row as last time and am either trying to close the row or open it");
            // OPEN ITEM
            if ( !dropdownIsOpen ) { 
                // console.log("open the menu and set isopen to true!");
                openAccordianItem();
            // CLOSE ITEM
            } else { 
                // console.log("close the menu!");
                closeAccordianItem();
            }
        }
          
        if (lastRowClicked != currentRowClicked ) {
            // console.log("I have clicked a different row than last time and should open a new row and close the others!");
            openAccordianItem();
            
            // close other rows
            otherItemsArray.forEach((item) => {
            item.style.height = containerCloseHeightSettings;
            const otherPlusSign = item.querySelector(".plus-sign-container");
            const otherVertPlusSign = item.querySelector(".vertical-plus-sign");
            otherPlusSign.style.transform = plusSignCloseTransformSettings;
            otherPlusSign.style.transition = plusSignCloseTransitionSettings;
            otherVertPlusSign.style.transform = vertPlusPartCloseTransformSettings;
            otherVertPlusSign.style.transition = vertPlusPartCloseTransitionSettings;
            // const othersBodyTextContainer = item.querySelector(".dropdown-body-text-container");
            // othersBodyTextContainer.style.height = textCloseHeightSettings;
            // bodyTextContainer.style.transition = textCloseTransitionSettings;
            });
          }
          

        lastRowClicked = parentRowIndex;
        // console.log(`dropdownIsOpen: ${dropdownIsOpen}`);
        return lastRowClicked;
    
     } // ends result if statement

} // ends our startDropdown function

document.addEventListener("scroll", chooseFunction);
document.addEventListener("DOMContentLoaded", chooseFunction);
document.addEventListener("resize", chooseFunction);