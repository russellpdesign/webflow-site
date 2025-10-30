// get menu variables
const menu = document.querySelector(".menu-logo");
const menuCircleBg = document.querySelector(".menu-circle-bg");
const menuLogoStroked = document.querySelector(".menu-logo-stroked_blk");
const menuProjectList = document.querySelector(".menu-project-list");
const email = document.querySelector(".email");
const soshIcons = document.querySelector(".sosh-icons");
const menuLogo = document.querySelector(".menu-logo");
const contact = document.querySelector(".contact.is-left-just");
const projects = document.querySelector(".menu-link.projects");
const menuWrapper = document.querySelector(".menu-wrapper");
const menuGrid = document.querySelector(".grid.menu");
const menuFlexboxWrapper = document.querySelector(".menu-flexbox-wrapper");
const isAbout = document.querySelector(".menu-link-wrap.is-about");
const isContact = document.querySelector(".menu-link-wrap.is-contact");
const isProjects = document.querySelector(".menu-link-wrap.is-projects");
const projectList = document.querySelector(".menu-project-list");

// reset style parameters injected by webflow interactions

window.onload = menuCircleBg.setAttribute("style", "");
window.onload = menuLogoStroked.setAttribute("style", "");
window.onload = menu.setAttribute("style", "");
window.onload = menuWrapper.setAttribute("style", "");
window.onresize = menuCircleBg.setAttribute("style", "");

// when window is resized, reset the circle background class styles that are injected by webflow interactions
function resetStyle() {
  menuCircleBg.setAttribute("style", "");
}

window.addEventListener("resize", resetStyle);

let isOpen = false;

function menuDisplay(event) {
  // this part opens the menu if the menu has just been clicked
  console.log("A click on the menu logo has been detected");

  if (isOpen === false) {
    openMenu();
  }
  if (isOpen === true) {
    closeMenu();
  }

  function openMenu() {
    console.log("I have been opened!");
    menuCircleBg.classList.add("clicked");
    menuLogoStroked.classList.add("clicked");
    menu.classList.add("clicked");
    menuWrapper.classList.add("clicked");
    menuWrapper.setAttribute("style", "");
    contact.classList.add("clicked");
    contact.setAttribute("style", "");
    projectList.setAttribute("style", "");
    isAbout.setAttribute("style", "");
    isContact.setAttribute("style", "");
    isProjects.setAttribute("style", "");
    email.setAttribute("style", "");
    soshIcons.setAttribute("style", "");

    // sets default time interval for our setTimeout delay, for Chrome, it should be 0, for whatever reason this allows us to animate from display: none; to display: block;
    let intervalTime = 0;

    // if the browser is Firefox, there is a bug and we need to set an actual delay interval so the menu header links don't just appear without animating downwards
    if (window.navigator.userAgent.includes("Firefox")) {
      intervalTime = 2;
    }

    function addClickedMenuNav() {
      console.log("I should now show the contents of the menu");
      menuGrid.classList.add("clicked");
      isAbout.classList.add("clicked");
      isContact.classList.add("clicked");
      isProjects.classList.add("clicked");
      projectList.classList.add("clicked");
      email.classList.add("clicked");
      soshIcons.classList.add("clicked");
      console.log("isOpen is now set to true");
      isOpen = true;
    }

    requestAnimationFrame(addClickedMenuNav, intervalTime);
  } // end of open menu function

  // this part closes the menu
  function closeMenu() {
    console.log("I have been closed! Start the 1500ms timer!");
    menuCircleBg.classList.remove("clicked");
    menuLogoStroked.classList.remove("clicked");
    menu.classList.remove("clicked");
    menuGrid.classList.remove("clicked");
    contact.classList.remove("clicked");
    contact.style.setProperty(
      "transition",
      "transform .5s cubic-bezier(0.33, 1, 0.68, 1) .8s"
    );

    isAbout.classList.remove("clicked");
    isContact.classList.remove("clicked");
    isProjects.classList.remove("clicked");
    projectList.classList.remove("clicked");
    email.classList.remove("clicked");
    soshIcons.classList.remove("clicked");
    console.log(
      "I have been closed, and will remove style properties from about, contant and projects now"
    );
    isAbout.setAttribute("style", "");
    isContact.setAttribute("style", "");
    isProjects.setAttribute("style", "");
    console.log("isOpen should now be set back to false");
    isOpen = false;

    requestAnimationFrame(clearedTimer, 1500);

    // this function checks if it has changed to false, and if it has, it removes that additional clicked class to allow them to be clicked again...after 1.5seconds)
    // it then ends the functions and you can wait to hear another click again

    function clearedTimer() {
      if (menu.classList.contains("clicked") === false) {
        console.log("I cleared the timer!");
        menuWrapper.classList.remove("clicked");
        console.log("I have been closed now!");
        projectList.setAttribute("style", "");
        menuWrapper.setAttribute("style", "");
        isAbout.setAttribute("style", "");
        isContact.setAttribute("style", "");
        isProjects.setAttribute("style", "");
      } // ends if statement function
    } // ends cleared timer function
  } // ends close menu function
} // closes menu display function

// resets our inline styles

isAbout.setAttribute("style", "!important");
isContact.setAttribute("style", "");
isProjects.setAttribute("style", "");

// this function checks if we are on the home page, and if we are, close the menu. Other pages do not require the menu to close.

function homeProjectsClicked() {
  if (window.location.pathname === "/") {
    console.log("The projects link was clicked, and I am on the home page");
    menuDisplay();
  }
}

menu.addEventListener("click", menuDisplay);
isProjects.addEventListener("click", homeProjectsClicked);
