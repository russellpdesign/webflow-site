// dropdown functionality horizontal scroll section
  const dropdownContainerNodeList = document.querySelectorAll(".dropdown-row-container");
  const dropdownRows = Array.from(dropdownContainerNodeList);
  let lastRowClicked;
  console.log(lastRowClicked);
  let dropdownIsOpen = false;
  
function doStuff(e) {
  const dropdownWrapper = document.querySelector(".dropdown-wrapper");
  let currentRowClicked = dropdownRows.indexOf(e.target.offsetParent);const parentRow = e.target.offsetParent;
  const parentRowIndex = dropdownRows.indexOf(parentRow);
  
  console.log(lastRowClicked, currentRowClicked);
  
  const bodyText = dropdownRows[parentRowIndex].querySelector(".dropdown-body-text");
  const bodyTextHeight = bodyText.getBoundingClientRect().height;
  const bodyTextContainer = parentRow.querySelector(".dropdown-body-text-container");
  console.log(bodyTextContainer);
  
  const otherItemsArray = dropdownRows.filter(item => item !== dropdownRows[parentRowIndex]);

  // Container Settings OPEN
  const containerOpenHeightSettings = `calc(5vw + ${bodyTextHeight}px`;
  const containerOpenTransitionSettings = "height 0.4s cubic-bezier(.25, .46, .45, .94) 0s";

  // TextBox Settings OPEN
  const textOpenHeightSettings = "100%";
  const textOpenTransitionSettings = "height 0.4s cubic-bezier(.25, .46, .45, .94) .1s";

  // Container Settings CLOSE
  const containerCloseHeightSettings = `5vw`;
  const containerCloseTransitionSettings = "height 0.4s cubic-bezier(.25, .46, .45, .94) 0s";

  // TextBox Settings CLOSE
  const textCloseHeightSettings = "0%";
  const textCloseTransitionSettings = "height 0.4s cubic-bezier(.25, .46, .45, .94) 0s";

  function openAccordianItem() {
          parentRow.style.height = containerOpenHeightSettings;
          parentRow.style.transition = containerOpenTransitionSettings;
		  bodyTextContainer.style.height = textOpenHeightSettings;
          bodyTextContainer.style.transition = textOpenTransitionSettings;
          dropdownIsOpen = true;
  }

  function closeAccordianItem() {
        parentRow.style.height = containerCloseHeightSettings;
        parentRow.style.transition = containerCloseTransitionSettings;
        bodyTextContainer.style.height = textCloseHeightSettings
        bodyTextContainer.style.transition = textCloseTransitionSettings;
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
        const othersBodyTextContainer = item.querySelector(".dropdown-body-text-container");
        othersBodyTextContainer.style.height = textCloseHeightSettings;
        bodyTextContainer.style.transition = textCloseTransitionSettings;
        });
      }
      

    lastRowClicked = parentRowIndex;
    console.log(`dropdownIsOpen: ${dropdownIsOpen}`);
    return lastRowClicked;
}

dropdownRows.forEach(row => addEventListener("click", doStuff));

// testing git push