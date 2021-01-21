let openEditor = document.querySelector('.profile__edit');


let closeEditor = document.querySelector('.edit-profile__close');


let editPopup = document.querySelector('.edit-profile');


function showPopup() {
    editPopup.classList.add('edit-profile_active');
}

function hidePopup() {
    editPopup.classList.remove('edit-profile_active');
}
  
openEditor.addEventListener('click', showPopup); 

closeEditor.addEventListener('click', hidePopup); 

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let newProfileName = document.querySelector('.edit-profile__name');
let newProfileDescription = document.querySelector('.edit-profile__description');

let saveButton = document.querySelector('.edit-profile__button');

newProfileName.value = profileName.textContent;
newProfileDescription.value = profileDescription.textContent;

function editInformation () {
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    editPopup.classList.remove('edit-profile_active');
}

saveButton.addEventListener('click', editInformation)