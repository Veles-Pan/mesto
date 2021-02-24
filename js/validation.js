const validationElements = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    popupErrorSelector: '.popup__error',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function enableValidation(validationElements) {
    const formList = Array.from(document.querySelectorAll(validationElements.formSelector));

    formList.forEach((formElement) => {
        const formInput = Array.from(formElement.querySelectorAll(validationElements.inputSelector));

        setEventListeners(formInput, formElement, validationElements.submitButtonSelector, validationElements.inactiveButtonClass, validationElements.inputErrorClass, validationElements.errorClass, validationElements.popupErrorSelector);
    });
}

function setEventListeners(formInput, form,ButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, popupErrorSelector) {
    const buttonElement = form.querySelector(ButtonSelector);

    toggleButtonState(formInput, buttonElement, inactiveButtonClass);

    formInput.forEach((input) => {
        input.addEventListener('input', function() {
            checkInputValidity(formInput, inputErrorClass, errorClass, popupErrorSelector);
            toggleButtonState(formInput, buttonElement, inactiveButtonClass);
        });
    });
}

function checkInputValidity (formInput, inputErrorClass, errorClass, popupErrorSelector) {
    formInput.forEach((input) => {
        if (!input.validity.valid) {
            showInputError(input, inputErrorClass, errorClass, popupErrorSelector);
        } else {
            hideInputError(input, inputErrorClass, errorClass, popupErrorSelector);
        }
    });
};

enableValidation(validationElements);

function showInputError(inputElement, inputErrorClass, errorClass, popupErrorSelector) {
    const errorElement = inputElement.closest('.popup__field').querySelector(popupErrorSelector);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
};

function hideInputError(inputElement, inputErrorClass, errorClass, popupErrorSelector) {
    const errorElement = inputElement.closest('.popup__field').querySelector(popupErrorSelector);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
};

function toggleButtonState(formInput, buttonElement, inactiveButtonClass) {
    let toggleElement = false;

    formInput.forEach((input) => {
        if(!hasInvalidInput(input)) {
            toggleElement = true;
        }
    })
    if(!toggleElement) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    } 
    else {
        buttonElement.classList.add(inactiveButtonClass)
        buttonElement.setAttribute('disabled', true);
    }
}

function hasInvalidInput (inputElement) {
    if (inputElement.validity !== undefined) {
    return inputElement.validity.valid;
    }
}
