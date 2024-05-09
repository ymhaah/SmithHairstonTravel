const URL =
    "https://script.google.com/macros/s/AKfycbwjv_BtMagaW0IoseEdTSaHGSa2SvuH9XbV7OW4l-EIGK7OpXelOW0bj6ncRuE_QQVwLQ/exec";

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

// ? Closes the navigation menu when scroll away.
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
let nameInput = document.getElementById("input-name");
let emailInput = document.getElementById("input-email");
let phoneNumberInput = document.getElementById("Phone-number");
let locationInput = document.getElementById("input-location");
let destinationInput = document.getElementById("input-destination");
let dateInput = document.getElementById("input-date");
let returnDateInput = document.getElementById("input-return-date");
const submittedMessage = document.getElementById("submit-message");

dateInput.addEventListener("click", () => {
    dateInput.showPicker();
});
dateInput.addEventListener("focus", () => {
    dateInput.showPicker();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = nameInput.value;
    let email = emailInput.value;
    let location = locationInput.value;
    let destination = destinationInput.value;
    let date = dateInput.value;
    let returnDate = returnDateInput.value;
    let priceRange = phoneNumberInput.value;

    // ? Function to reset input fields
    function resetInput() {
        nameInput.value = "";
        emailInput.value = "";
        locationInput.value = "";
        destinationInput.value = "";
        dateInput.value = "";
        returnDateInput.value = "";
        phoneNumberInput.value = "";
    }
    // ? Function to update form state message
    function formStateMessage(message, errorState) {
        submittedMessage.textContent = message;
        submittedMessage.setAttribute("date-form-error", errorState);
    }
    // ? Function to validate text input
    function validateInput(input, fieldName) {
        const trimmedValue = input.value.trim();

        if (trimmedValue === "") {
            formStateMessage(
                `${fieldName} cannot be empty. Please enter some text.`,
                "error"
            );
            input.select();
            return false;
        }

        if (/^\d+$/.test(trimmedValue)) {
            formStateMessage(
                `Invalid ${fieldName}. ${fieldName} cannot be just a number. Please enter valid text.`,
                "error"
            );
            input.select();
            return false;
        }

        if (/<[^>]*>?/gm.test(trimmedValue)) {
            formStateMessage(
                `Invalid ${fieldName}. ${fieldName} contains invalid characters. Please enter valid text.`,
                "error"
            );
            input.select();
            return false;
        }

        if (/[\x00-\x1F\x7F]/.test(trimmedValue)) {
            formStateMessage(
                `Invalid ${fieldName}. ${fieldName} contains control characters. Please enter valid text.`,
                "error"
            );
            input.select();
            return false;
        }

        if (/[^a-zA-Z0-9\s]/.test(trimmedValue)) {
            formStateMessage(
                `Invalid ${fieldName}. ${fieldName} contains disallowed special characters. Please enter valid text.`,
                "error"
            );
            input.select();
            return false;
        }

        return true;
    }
    // ? Function to validate email input
    function validateEmail(input) {
        const trimmedEmail = input.value.trim();

        if (trimmedEmail === "") {
            formStateMessage(
                "Email address cannot be empty. Please enter a valid email.",
                "error"
            );
            input.select();
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            formStateMessage(
                "Invalid email address format. Please enter a valid email.",
                "error"
            );
            input.select();
            return false;
        }

        if (/[\x00-\x1F\x7F]/.test(trimmedEmail)) {
            formStateMessage(
                "Email address contains control characters. Please enter a valid email.",
                "error"
            );
            input.select();
            return false;
        }

        if (/[^a-zA-Z0-9@._-]/.test(trimmedEmail)) {
            formStateMessage(
                "Email address contains disallowed special characters. Please enter a valid email.",
                "error"
            );
            input.select();
            return false;
        }

        return true;
    }

    // ? Submit form data to server
    if (
        validateInput(nameInput, "Name") &&
        validateInput(locationInput, "Location") &&
        validateInput(destinationInput, "Destination") &&
        validateEmail(emailInput)
    ) {
        event.preventDefault();
        let formData = new FormData(form);
        var keyValuePairs = [];
        for (var pair of formData.entries()) {
            keyValuePairs.push(pair[0] + "=" + pair[1]);
        }

        var formDataString = keyValuePairs.join("&");

        fetch(URL, {
            redirect: "follow",
            method: "POST",
            body: formDataString,
            headers: { "Content-Type": "text/plain;charset=utf-8" },
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Failed to submit the form.");
                }
            })
            .then((data) => {
                if (data) {
                    resetInput();
                    formStateMessage("Form submit successfully.", "success");
                    window.setTimeout(() => {
                        formStateMessage(
                            "Please enter your information to submit.",
                            "waiting"
                        );
                    }, 10000);
                } else {
                    console.error(data);
                    formStateMessage(
                        "There was an error submitting the form. Please try again later.",
                        "error"
                    );
                }
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                formStateMessage(
                    "There was an error submitting the form. Please try agin later",
                    "error"
                );
            });
    }
});

console.log(`Made with 💙 by Youssef Hefnawy: https://twitter.com/hafanwy`);
