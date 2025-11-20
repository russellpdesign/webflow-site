// IIFE
(function myFunction() {
  
  // class of the row container
  const dropdownRowsClassName = "dropdown-row-container";
  // nodelist of the rows
  // const dropdownContainerNodeList = document.querySelectorAll(`.${dropdownRowsClassName}`);
  const dropdownRows = Array.from(document.querySelectorAll(`.${dropdownRowsClassName}`));
  console.log(dropdownRows);
  let lastRowClicked;
  console.log(lastRowClicked);
  let dropdownIsOpen = false;
  
function doStuff(e) {
    // if our target is not the dropdown, we dont run the function)
    let result = e.target.offsetParent?.classList.contains(dropdownRowsClassName);
    console.log(result)

      return result ? (() => { 
      
      // our dropdown logic
      const parentRow = e.target.offsetParent;
      const parentRowIndex = dropdownRows.indexOf(parentRow);
      console.log(parentRow);
      
      console.log(lastRowClicked, currentRowClicked);
      
      const bodyText = dropdownRows[parentRowIndex].querySelector(".dropdown-body-text");
      const bodyTextHeight = bodyText.getBoundingClientRect().height;
      const bodyTextContainer = parentRow.querySelector(".dropdown-body-text-container");
      const plusSign = parentRow.querySelector(".plus-sign-container");
      console.log(plusSign);
      
      const otherItemsArray = dropdownRows.filter(item => item !== dropdownRows[parentRowIndex]);

      // Container Settings OPEN
      const containerOpenHeightSettings = `calc(5vw + ${bodyTextHeight}px`;
      const containerOpenTransitionSettings = "height 0.5s ease";

      // TextBox Settings OPEN
      const textOpenHeightSettings = "100%";
      const textOpenTransitionSettings = "height 0.5s ease";
      
      // plus sign OPEN
      const plusSignOpenTransformSettings = "rotate3D(0, 0, 1, 45deg)";
      const plusSignOpenTransitionSettings = "transform .5s ease";

      // Container Settings CLOSE
      const containerCloseHeightSettings = `5vw`;
      const containerCloseTransitionSettings = "height 0.5s ease";

      // TextBox Settings CLOSE
      const textCloseHeightSettings = "0%";
      const textCloseTransitionSettings = "height 0.4s ease";
      
      // plus sign CLOSE
      const plusSignCloseTransformSettings = "rotate3D(0, 0, 1, 0deg)";
      const plusSignCloseTransitionSettings = "transform .5s ease";

      function openAccordianItem() {
              parentRow.style.height = containerOpenHeightSettings;
              parentRow.style.transition = containerOpenTransitionSettings;
              plusSign.style.transform = plusSignOpenTransformSettings;
              plusSign.style.transition = plusSignOpenTransitionSettings;
              // bodyTextContainer.style.height = textOpenHeightSettings;
              // bodyTextContainer.style.transition = textOpenTransitionSettings;
              dropdownIsOpen = true;
      }

      function closeAccordianItem() {
            parentRow.style.height = containerCloseHeightSettings;
            parentRow.style.transition = containerCloseTransitionSettings;
            plusSign.style.transform = plusSignCloseTransformSettings;
            plusSign.style.transition = plusSignCloseTransitionSettings;
            // bodyTextContainer.style.height = textCloseHeightSettings
            // bodyTextContainer.style.transition = textCloseTransitionSettings;
            dropdownIsOpen = false;
      }


      
      console.log(otherItemsArray);


      if ( lastRowClicked == currentRowClicked ) {
            console.log("I clicked the same row as last time and am either trying to close the row or open it");
            // OPEN ITEM
            if ( !dropdownIsOpen ) { 
                console.log("open the menu and set isopen to true!");
                openAccordianItem();
            // CLOSE ITEM
            } else { 
                console.log("close the menu!");
                closeAccordianItem();
            }
        }
          
        if (lastRowClicked != currentRowClicked ) {
            console.log("I have clicked a different row than last time and should open a new row and close the others!");
            openAccordianItem();
            
            // close other rows
            otherItemsArray.forEach((item) => {
            item.style.height = containerCloseHeightSettings;
            const otherPlusSign = item.querySelector(".plus-sign-container");
            otherPlusSign.style.transform = plusSignCloseTransformSettings;
            otherPlusSign.style.transition = plusSignCloseTransitionSettings;
            // const othersBodyTextContainer = item.querySelector(".dropdown-body-text-container");
            // othersBodyTextContainer.style.height = textCloseHeightSettings;
            // bodyTextContainer.style.transition = textCloseTransitionSettings;
            });
          }
          

        lastRowClicked = parentRowIndex;
        console.log(`dropdownIsOpen: ${dropdownIsOpen}`);
        return lastRowClicked;

        }) : "false" ;
}


dropdownRows.forEach(row => addEventListener("click", doStuff));


})(); // ends IIFE

