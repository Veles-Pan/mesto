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

const newProfileName = document.querySelector('.popup__input_type_name');
const newProfileDescription = document.querySelector('.popup__input_type_description');

const cardTitle = document.querySelector('.popup__input_type_title'); 

const cardLink = document.querySelector('.popup__input_type_link');

const gridArea = document.querySelector('.grid-area');

const templateCard = document.querySelector('.template-card').content;

const popupButton = document.querySelector('.popup__close_photo');

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

    cardElement.querySelector('.card__delete').addEventListener('click', function (event) {
        event.target.closest('.card').remove();
    });

    cardPhoto.addEventListener('click', function () {
        openPhotoPopup(name, link);
    })

    return cardElement
}

function addCard(container, cardElement) {
    container.prepend(cardElement)
}

function openPhotoPopup (name, link) {

    const photoPopup = document.querySelector('.popup_photo');

    const popupImage = document.querySelector('.popup__photo');
    popupImage.src = link;
    popupImage.alt = name;

    const popupTitle = document.querySelector('.popup__photo-title');
    popupTitle.textContent = name;

    popupOpen(photoPopup);
}

function popupOpen (popupName) {
    popupName.classList.add('popup_active');
}

function popupClose (popupName) {
    popupName.classList.remove('popup_active');
}

function editInformation (evt) {
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    popupClose(renamePopup)
    evt.preventDefault();
}

function createNewCard (event) {
    addCard(gridArea, createCard(cardTitle.value, cardLink.value));
    popupClose(addPopup);
    event.preventDefault();
}

initialCards.forEach (function (item) {
    addCard(gridArea, createCard(item.name, item.link));

});

popupButton.addEventListener('click', function () {
    popupClose(popupButton.closest('.popup_photo'))
})
  
openNameEditor.addEventListener('click', function () {
    newProfileName.value = profileName.textContent;
    newProfileDescription.value = profileDescription.textContent;
    popupOpen(renamePopup)}); 

closeNameEditor.addEventListener('click', function () {popupClose(renamePopup)}); 

formEdit.addEventListener('submit', editInformation);

openCardEditor.addEventListener('click', function () {
    addForm.reset();
    popupOpen(addPopup)});

closeCardEditor.addEventListener('click', function () {popupClose(addPopup)});

addForm.addEventListener('submit', createNewCard);
