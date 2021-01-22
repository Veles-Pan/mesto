let openEditor = document.querySelector('.profile__button');

let form = document.querySelector('.popup__container');

let closeEditor = document.querySelector('.popup__close');

let editPopup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let newProfileName = document.querySelector('.popup__name');
let newProfileDescription = document.querySelector('.popup__description');

let saveButton = document.querySelector('.popup__button');

function showPopup() {
    newProfileName.value = profileName.textContent;
    newProfileDescription.value = profileDescription.textContent;
    editPopup.classList.add('popup_active');
}

function hidePopup() {
    editPopup.classList.remove('popup_active');
}

function editInformation (evt) {
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    editPopup.classList.remove('popup_active');
    evt.preventDefault();
}

  
openEditor.addEventListener('click', showPopup); 

closeEditor.addEventListener('click', hidePopup); 

form.addEventListener('submit', editInformation);
