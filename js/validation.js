const validationElements = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__container'));

    formList.forEach((formElement) => {
        const formInput = Array.from(formElement.querySelectorAll('.popup__input'));

        setEventListeners(formInput, formElement);

    });
}

function setEventListeners(formInput, form) {
    const buttonElement = form.querySelector('.popup__button');

    toggleButtonState(formInput, buttonElement);

    formInput.forEach((input) => {
        input.addEventListener('input', function() {
            checkInputValidity(formInput);
            toggleButtonState(formInput, buttonElement);
        })
    })


}



function checkInputValidity (formInput) {
    formInput.forEach((input) => {
        if (!input.validity.valid) {
            showInputError(input);
        } else {
            hideInputError(input);
        }
    })
    
};

  
enableValidation();



function showInputError(inputElement) {
    const errorElement = inputElement.closest('.popup__field').querySelector('.popup__error');
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__error_visible');
};

function hideInputError(inputElement) {
    const errorElement = inputElement.closest('.popup__field').querySelector('.popup__error');
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
};

function toggleButtonState(formInput, buttonElement) {
    let toggleElement = false;

    formInput.forEach((input) => {
        if(!hasInvalidInput(input)) {
            toggleElement = true;
        }
    })
    if(!toggleElement) {
        buttonElement.classList.remove('popup__button_disabled');
        buttonElement.removeAttribute('disabled');
    } 
    else {
        buttonElement.classList.add('popup__button_disabled')
        buttonElement.setAttribute('disabled', true);
    }
}

function hasInvalidInput (inputElement) {
    if (inputElement.validity !== undefined) {
    return inputElement.validity.valid;
    }
}