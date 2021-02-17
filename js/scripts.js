const openNameEditor = document.querySelector('.profile__button');

const openCardEditor = document.querySelector('.profile__add-photo');

const closeCardEditor = document.querySelector('.popup__close_add');

const formEdit = document.querySelector('.popup__container_rename');

const addForm = document.querySelector('.popup__container_add');

const closeNameEditor = document.querySelector('.popup__close_rename');

const renamePopup = document.querySelector('.popup_rename');

const addPopup = document.querySelector('.popup_add');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

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

function createCard (name, link) {
    const cardElement = templateCard.querySelector('.card').cloneNode(true);

    const cardPhoto = cardElement.querySelector('.card__photo');
    cardPhoto.src = link;
    cardPhoto.alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active')
    });

    cardElement.querySelector('.card__delete').addEventListener('click', function () {
        cardElement.remove();
    });

    cardPhoto.addEventListener('click', function () {
        addCard(gridArea, createPopup(name,link));
    })

    return cardElement
}

function createPopup (name, link) {

    
    const popupElement = document.querySelector('.card-popup').cloneNode(true);

    const popupPhoto = popupElement.querySelector('.card-popup__photo');
    popupPhoto.src = link;
    popupPhoto.alt = name;
    popupElement.querySelector('.card-popup__title').textContent = name;
    popupElement.classList.add('card-popup_active');

    popupElement.classList.remove('card-popup_closed');

    popupElement.querySelector('.card-popup__close').addEventListener('click', function () {
        popupElement.classList.add('card-popup_closed');
        popupElement.addEventListener('transitionend', function () {popupElement.remove()})

    });

    return popupElement;
}

function addCard(container, cardElement) {
    container.append(cardElement)
}

function showPopup(popupName) {
    newProfileName.value = profileName.textContent;
    newProfileDescription.value = profileDescription.textContent;
    popupName.classList.remove('popup_closed');
    popupName.classList.add('popup_active');

}

function hidePopup(popupName) {
    addForm.reset();
    popupName.classList.add('popup_closed');
    popupName.classList.remove('popup_active');
    

}


function editInformation (evt) {
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    hidePopup(renamePopup)
    evt.preventDefault();
}

function createNewCard (event) {
    addCard(gridArea, createCard(cardTitle.value, cardLink.value));
    hidePopup(addPopup);
    event.preventDefault();
}

initialCards.forEach (function (item) {
    addCard(gridArea, createCard(item.name, item.link));

});
  
openNameEditor.addEventListener('click', function () {showPopup(renamePopup)}); 

closeNameEditor.addEventListener('click', function () {hidePopup(renamePopup)}); 

formEdit.addEventListener('submit', editInformation);

openCardEditor.addEventListener('click', function () {showPopup(addPopup)});

closeCardEditor.addEventListener('click', function () {hidePopup(addPopup)});

addForm.addEventListener('submit', createNewCard);
