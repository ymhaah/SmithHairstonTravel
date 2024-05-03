// ? Add a message to the document title when the window loses focus
window.addEventListener("blur", () => {
    document.title = `We will miss you - ${document.title}`;
});

// ? Reset document title to the default title
window.addEventListener("focus", () => {
    document.title = `SmithHairston Travel`;
});

// ################# (header) #################
const phoneNavList = document.querySelector(".header__main-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", toggleNavigation);
window.addEventListener("scroll", () => {
    const isNavOpen = navToggle.getAttribute("aria-expanded") === "true";

    if (isNavOpen) {
        closeNav();
    }
});

// ? Toggles the navigation menu open/close states.
function toggleNavigation() {
    const isNavOpen = navToggle.getAttribute("aria-expanded") === "true";

    if (isNavOpen) {
        closeNav();
    } else {
        openNav();
    }
}

// ? Opens the navigation menu.
function openNav() {
    // Update attributes
    navToggle.setAttribute("aria-expanded", true);
    phoneNavList.setAttribute("data-state", "opened");
}

// ? Closes the navigation menu.
function closeNav() {
    navToggle.setAttribute("aria-expanded", false);
    phoneNavList.setAttribute("data-state", "closing");

    // Listen for animation end to change data state to closed
    phoneNavList.addEventListener("animationend", onAnimationEnd, {
        once: true,
    });
}

function onAnimationEnd() {
    phoneNavList.setAttribute("data-state", "closed");
}

// ################# (hero) #################
const heroImages = document.querySelectorAll(".hero-image img");
const imagesPlaceholder = document.querySelectorAll(
    ".hero-image .image-placeholder"
);

// ################# (form) #################

const inputName = document.querySelector("input#input-name");
const inputLocation = document.querySelector("input#input-location");
const inputDestination = document.querySelector("input#input-destination");
const inputDate = document.querySelector("input#input-date");
const inputPrice = document.querySelector("input#input-price");
const submitBtn = document.querySelector("#form-submit-btn");
const submitMessage = document.querySelector("#submit-message");

submitBtn.addEventListener("click", (e) => {
    const name = inputName.value;
    const location = inputLocation.value;
    const destination = inputDestination.value;
    const date = inputDate.value;
    const price = inputPrice.value;

    e.preventDefault();
});

console.log(`Made with 💙 by Youssef Hefnawy: https://twitter.com/hafanwy`);
