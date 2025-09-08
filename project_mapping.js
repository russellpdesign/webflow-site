// 1 - make master list from nav
// 2 - set their number text by adding one to their index
// 3 - make projects section on home page congruent with order of nav menu
// 4 - update project number text on hero of projects page (requires the title of the page to be same as in nav menu)

// 1 - our global variables are used to verify what page we are on, as well as set the masterLists numbertext to the proper values
const homePageTitle = "Russell Pritchard (CD, Design)".toLowerCase();
const aboutPageTitle = "About".toLowerCase();
const contactPageTitle = "Contact".toLowerCase();
const currentPageTitle = document.title.toLowerCase();

// establishing a baseline masterList for the arrangement of our projects (this happens on all pages, as our full screen menu is persistant across our site)
const menuListArray = [
  ...document.querySelectorAll(".menu-project-list-item-wrap"),
];
const projectsArray = [...document.querySelectorAll(".menu-project-link")];
const specsContent = document.querySelectorAll(".project-specs-content");
let i = 1;
const masterList = [];
projectsArray.forEach((item) => {
  let menuprojectno = specsContent[i - 1].querySelector("a.project-link-no");
  let stats = {
    title: item.innerHTML.toLowerCase(),
    numbertext: 0 + `${i}`,
  };
  // 2 - rewriting / setting their numbertext to the appropriate numeral as they appear in the list (helpful if we ever turn a project to invisible, or add projects out of order)
  menuprojectno.innerText = stats.numbertext;
  i++;
  masterList.push(stats);
});

// 3 - if we are on the home page ONLY, get our home page projects section list elements and create an array for each with their Title, index position in their list, and that item's dom element / code
if (currentPageTitle === homePageTitle) {
  console.log("I am on the home page");
  const homeProjectsList = document.querySelectorAll(".project-item");
  const projectHomeListTitle = document.querySelectorAll("h3.project-title");
  const projectHomeListNumber = document.querySelectorAll(".num-txt");
  let o = 0;
  let currentHomeListItems = [];

  // for each item in our nodelist, create an object container the items title, its index value, and its code text string
  homeProjectsList.forEach((item) => {
    let homeListItem = {
      title: projectHomeListTitle[o].innerText.toLowerCase(),
      index: o,
      domNode: homeProjectsList[o],
    };
    // push these objects to our new array called currentHomeListItems
    currentHomeListItems.push(homeListItem);
    o++;
    if (o > homeProjectsList.length) {
      return;
    }
  });

  // using the list we just created, match the item to its corresponding position in the master list
  let k = 0;
  let newOrderArray = [];
  // create an array of just the titles in our unmatched list
  let titleArray = currentHomeListItems.map((item) => item.title);
  //currentHomeListItems.forEach((item) => titleArray.push(item.title));
  // using that unordered array of titles, we get the index of its position from the properly ordered list via indexOf
  titleArray.forEach((item) => {
    let matchIndex = titleArray.indexOf(masterList[k].title);
    // we go to our undered list now, and grab the item of that index value and we push it to a new array, thusly making it first in that new array, matching its position to the masterList
    projectHomeListNumber[matchIndex].innerText = masterList[k].numbertext;
    newOrderArray.push(currentHomeListItems[matchIndex]);
    k++;
  });

  // update our projects order by creating an array of properly ordered dom nodes and push each one into the project list section as a new child
  const projectHomeListContainer = document.querySelector(".project-list");
  const newCodeArray = [];
  newOrderArray.forEach((item) => newCodeArray.push(item.domNode));
  newCodeArray.forEach((node) => {
    projectHomeListContainer.appendChild(node);
  });
} // end of home page list updating conditional if statement

if (currentPageTitle === aboutPageTitle) {
  console.log("we match!");
}

// 4 - if we are on a project page ONLY do the following
if (
  currentPageTitle !== aboutPageTitle &&
  currentPageTitle !== homePageTitle &&
  currentPageTitle !== contactPageTitle
) {
  console.log(`I am on the ${currentPageTitle} page`);
  const projectPageNumber = document.querySelector("span.project-number");
  let masterTitles = masterList.map((item) => item.title);
  let pageNoIndex = masterTitles.indexOf(currentPageTitle);
  projectPageNumber.innerText = masterList[pageNoIndex].numbertext + ")";
  console.log(masterList[pageNoIndex].numbertext);
} // end of project page only if statement

// end of projects list mapping code
