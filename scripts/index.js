const URL = "";

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

// ################# (form) #################

const form = document.querySelector("form");
const submitMessage = document.getElementById("submit-message");

console.log(form);

submitMessage.addEventListener("click", (e) => {
    e.preventDefault();
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // let name = document.getElementById("input-name").value;
    // let email = document.getElementById("input-email").value;
    // let location = document.getElementById("input-location").value;
    // let destination = document.getElementById("input-destination").value;
    // let travelDate = document.getElementById("input-date-from").value;
    // let priceRange = document.getElementById("input-price").value;

    // function resetInput() {
    //     name = "";
    //     email = "";
    //     location = "";
    //     destination = "";
    //     travelDate = "";
    //     priceRange = "";
    //     console.log("reset");
    // }

    // // Form validation
    // let isValid = true;
    // submitMessage.textContent = "";

    // if (
    //     name.trim() === "" ||
    //     name.trim().length === 0 ||
    //     typeof name !== "string"
    // ) {
    //     submitMessage.textContent = "Please enter a valid name.";
    //     isValid = false;
    // }
    // // if (!isValidEmail(email)) {
    // //     submitMessage.textContent = "Please enter a valid email.";
    // //     isValid = false;
    // // }

    // if (isValid) {
    //     event.preventDefault();
    //     // Submit form data to server
    //     const formData = {
    //         name,
    //         email,
    //         location,
    //         destination,
    //         travelDate,
    //         priceRange,
    //     };

    //     fetch(URL, {
    //         method: "POST",
    //         body: JSON.stringify(formData),
    //         headers: { "Content-Type": "application/json" },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.success) {
    //                 resetInput();
    //                 submitMessage.textContent = "Form submitted successfully!";
    //             } else {
    //                 submitMessage.textContent =
    //                     "There was an error submitting the form.";
    //                 console.error(data.error); // Log the error for debugging on the client-side
    //             }
    //         })
    //         .catch((error) => {
    //             resetInput();
    //             console.error("Error submitting form:", error);
    //             submitMessage.textContent =
    //                 "There was an error submitting the form.";
    //         });
    // }
});

console.log(`Made with 💙 by Youssef Hefnawy: https://twitter.com/hafanwy`);
