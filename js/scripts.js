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

const pageContent = document.querySelector('.content');

let photoId = 0;

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
    cardElement.id = `card${photoId}`;

    const cardPhoto = cardElement.querySelector('.card__photo');
    cardPhoto.src = link;
    cardPhoto.alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active')
    });

    cardElement.querySelector('.card__delete').addEventListener('click', function () {
        const popupId = cardElement.id.slice(4);
        const popupForShow = document.querySelector(`#popup${popupId}`);
        popupForShow.remove();
        cardElement.remove();
    });

    cardPhoto.addEventListener('click', function () {
        const popupId = cardElement.id.slice(4);
        const popupForShow = document.querySelector(`#popup${popupId}`);
        popupVisibility(popupForShow);
    })

    createPopup(name, link);

    photoId += 1;

    return cardElement
}

function addCard(container, cardElement) {
    container.prepend(cardElement)
}

function createPopup (name, link) {

    const photoPopup = document.createElement('div');
    photoPopup.classList.add('popup', 'popup_photo');
    photoPopup.id = `popup${photoId}`;

    const popupDiv = document.createElement('div');
    popupDiv.classList.add('popup__area');

    const popupImage = document.createElement('img');
    popupImage.classList.add('popup__photo');
    popupImage.src = link;
    popupImage.alt = name;

    const popupTitle = document.createElement('p');
    popupTitle.classList.add('popup__photo-title');
    popupTitle.textContent = name;

    const popupButton = document.createElement('button');
    popupButton.classList.add('popup__close', 'popup__close_photo');

    popupButton.addEventListener('click', function () {
        popupVisibility(photoPopup)
    })


    popupDiv.append(popupImage, popupTitle, popupButton);

    photoPopup.append(popupDiv);

    pageContent.append(photoPopup);
}

function popupVisibility (popupName) {
    newProfileName.value = profileName.textContent;
    newProfileDescription.value = profileDescription.textContent;
    addForm.reset();
    popupName.classList.toggle('popup_active');
}

function editInformation (evt) {
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    popupVisibility(renamePopup)
    evt.preventDefault();
}

function createNewCard (event) {
    addCard(gridArea, createCard(cardTitle.value, cardLink.value));
    popupVisibility(addPopup);
    event.preventDefault();
}

initialCards.forEach (function (item) {
    addCard(gridArea, createCard(item.name, item.link));

});
  
openNameEditor.addEventListener('click', function () {popupVisibility(renamePopup)}); 

closeNameEditor.addEventListener('click', function () {popupVisibility(renamePopup)}); 

formEdit.addEventListener('submit', editInformation);

openCardEditor.addEventListener('click', function () {popupVisibility(addPopup)});

closeCardEditor.addEventListener('click', function () {popupVisibility(addPopup)});

addForm.addEventListener('submit', createNewCard);
