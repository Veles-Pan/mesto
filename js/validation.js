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

    checkButtonState(formInput, buttonElement, inactiveButtonClass);

    formInput.forEach((input) => {
        input.addEventListener('input', function() {
            checkInputValidity(formInput, inputErrorClass, errorClass, popupErrorSelector);
            checkButtonState(formInput, buttonElement, inactiveButtonClass);
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

function disableButtonState(buttonElement, inactiveButtonClass) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
}

function enableButtonState (buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
}

function checkButtonState (inputList, buttonElement, inactiveButtonClass) {
    if(hasInvalidInput(inputList)) {
        disableButtonState(buttonElement, inactiveButtonClass);
    } 
    else {
        enableButtonState(buttonElement, inactiveButtonClass);
    }
} 

function hasInvalidInput(inputList){ 
    return inputList.some((inputElement) => { 
      return !inputElement.validity.valid; 
    }); 
  } 


