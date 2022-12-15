// Elements
const licensingButton_1 = document.getElementById("ms-licensing-button-1");
const licensingButton_2 = document.getElementById("ms-licensing-button-2");

const licensingBlock_1 = document.getElementById("ms-licensing-info-1");
const licensingBlock_2 = document.getElementById("ms-licensing-info-2");

// Class constants
const ACTIVE_LICENSING_BUTTON_CLASS = "ms-licensing-button_active"
const HIDDEN_CLASS = "ms-g-hidden"

// Code :)
licensingButton_1.addEventListener("click", () => {

    if ( !licensingButton_1.classList.contains(ACTIVE_LICENSING_BUTTON_CLASS) ) {
        licensingButton_2.classList.remove(ACTIVE_LICENSING_BUTTON_CLASS);
        licensingButton_1.classList.add(ACTIVE_LICENSING_BUTTON_CLASS);

        licensingBlock_1.classList.remove(HIDDEN_CLASS);
        licensingBlock_2.classList.add(HIDDEN_CLASS);
    }

});

licensingButton_2.addEventListener("click", () => {
    if ( !licensingButton_2.classList.contains(ACTIVE_LICENSING_BUTTON_CLASS) ) {
        licensingButton_1.classList.remove(ACTIVE_LICENSING_BUTTON_CLASS);
        licensingButton_2.classList.add(ACTIVE_LICENSING_BUTTON_CLASS);

        licensingBlock_2.classList.remove(HIDDEN_CLASS);
        licensingBlock_1.classList.add(HIDDEN_CLASS);
    }
});
