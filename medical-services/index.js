// Elements
const licensingButton_1 = document.getElementById("ms-licensing-button-1");
const licensingButton_2 = document.getElementById("ms-licensing-button-2");

const licensingBlock_1 = document.getElementById("ms-licensing-info-1");
const licensingBlock_2 = document.getElementById("ms-licensing-info-2");

// Block for scroll into view (Licensing)
const licensingCommonBlock = document.getElementById("ms-licensing");

// Class constants
const ACTIVE_LICENSING_BUTTON_CLASS = "ms-licensing-button_active"
const HIDDEN_CLASS = "ms-g-hidden"

// Functions
const showPreLicensing = () => {
    if ( !licensingButton_1.classList.contains(ACTIVE_LICENSING_BUTTON_CLASS) ) {
        licensingButton_2.classList.remove(ACTIVE_LICENSING_BUTTON_CLASS);
        licensingButton_1.classList.add(ACTIVE_LICENSING_BUTTON_CLASS);

        licensingBlock_1.classList.remove(HIDDEN_CLASS);
        licensingBlock_2.classList.add(HIDDEN_CLASS);
    }
}
const showPostLicensing = () => {
    if ( !licensingButton_2.classList.contains(ACTIVE_LICENSING_BUTTON_CLASS) ) {
        licensingButton_1.classList.remove(ACTIVE_LICENSING_BUTTON_CLASS);
        licensingButton_2.classList.add(ACTIVE_LICENSING_BUTTON_CLASS);

        licensingBlock_2.classList.remove(HIDDEN_CLASS);
        licensingBlock_1.classList.add(HIDDEN_CLASS);
    }
}

// Code :)
// Check up hash for external links
if(window.location.hash && window.location.hash === "#prelicensing") {
    showPreLicensing();
    licensingCommonBlock.scrollIntoView();
} else if ( window.location.hash && window.location.hash === "#postlicensing") {
    showPostLicensing();
    licensingCommonBlock.scrollIntoView();
}

// Buttons listeners
licensingButton_1.addEventListener("click", () => {
    showPreLicensing();
    window.location.hash = "#prelicensing";
});

licensingButton_2.addEventListener("click", () => {
    showPostLicensing();
    window.location.hash = "#postlicensing";
});
