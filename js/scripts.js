let openNameEditor = document.querySelector('.profile__button');

let openCardEditor = document.querySelector('.profile__add-photo');

let closeCardEditor = document.querySelector('.popup__close_add');

let form = document.querySelector('.popup__container_rename');

let addForm = document.querySelector('.popup__container_add');

let closeNameEditor = document.querySelector('.popup__close_rename');

let renamePopup = document.querySelector('.popup_rename');

let addPopup = document.querySelector('.popup_add');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let newProfileName = document.querySelector('.popup__input_type_name');
let newProfileDescription = document.querySelector('.popup__input_type_description');

let cardTitle = document.querySelector('.popup__input_type_title'); 

let cardLink = document.querySelector('.popup__input_type_link');

const gridArea = document.querySelector('.grid-area');

const templateCard = document.querySelector('.template-card').content;

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

function addCard (name, link) {
    const cardElement = templateCard.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__photo').src = link;
    cardElement.querySelector('.card__photo').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active')
    });

    cardElement.querySelector('.card__delete').addEventListener('click', function () {
        cardElement.remove();
    });

    const popupElement = templateCard.querySelector('.card-popup').cloneNode(true);

    popupElement.querySelector('.card-popup__photo').src = link;
    popupElement.querySelector('.card-popup__title').textContent = name;

    cardElement.querySelector('.card__photo').addEventListener('click', function () {
        popupElement.classList.add('card-popup_active');
    })

    popupElement.querySelector('.card-popup__close').addEventListener('click', function () {
        popupElement.classList.add('opacity-change_reverse');

        setTimeout(() => {  popupElement.classList.remove('card-popup_active'); }, 380);
        setTimeout(() => {  popupElement.classList.remove('opacity-change_reverse'); }, 400);
    });

    gridArea.append(cardElement);
    gridArea.append(popupElement);
}


function showPopup() {
    newProfileName.value = profileName.textContent;
    newProfileDescription.value = profileDescription.textContent;
    renamePopup.classList.add('popup_active');
}

function hidePopup() {
    renamePopup.classList.add('opacity-change_reverse');
    setTimeout(() => {  renamePopup.classList.remove('popup_active'); }, 380);
    setTimeout(() => {  renamePopup.classList.remove('opacity-change_reverse'); }, 400);
}

function showAddForm () {
    cardTitle.value = '';
    cardLink.value = '';
    addPopup.classList.add('popup_active');
}

function closeAddForm () {
    addPopup.classList.add('opacity-change_reverse');
    setTimeout(() => {  addPopup.classList.remove('popup_active'); }, 380);
    setTimeout(() => {  addPopup.classList.remove('opacity-change_reverse'); }, 400);
}

function editInformation (evt) {
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    hidePopup();
    evt.preventDefault();
}

function createCard (event) {
    if (cardTitle.value !== '' && cardLink.value !== '') {
        addCard (cardTitle.value, cardLink.value);
        closeAddForm();
        event.preventDefault();
    } 
    else {
        closeAddForm();
    }
    
}

initialCards.forEach (function (item) {
    addCard(item.name, item.link);
});
  
openNameEditor.addEventListener('click', showPopup); 

closeNameEditor.addEventListener('click', hidePopup); 

form.addEventListener('submit', editInformation);

openCardEditor.addEventListener('click', showAddForm);

closeCardEditor.addEventListener('click', closeAddForm);

addForm.addEventListener('submit', createCard);
