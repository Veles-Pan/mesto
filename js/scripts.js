const openNameEditor = document.querySelector('.profile__button');

const openCardEditor = document.querySelector('.profile__add-photo');

const formEdit = document.querySelector('.popup__container_rename');

const addForm = document.querySelector('.popup__container_add');

const subminButton = addForm.querySelector('.popup__button');

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

const photoPopup = document.querySelector('.popup_photo');
const popupImage = photoPopup.querySelector('.popup__photo');
const popupTitle = photoPopup.querySelector('.popup__photo-title');

const popupAreaList = document.querySelectorAll('.popup');

const ECS_KEY_CODE = 27;

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
    popupImage.src = link;
    popupImage.alt = name;

    popupTitle.textContent = name;

    openPopup(photoPopup);
}

function handleClosePopupByEsc(evt) {
    if (evt.keyCode === ECS_KEY_CODE) {
      const openedPopup = document.querySelector('.popup_active');
      closePopup(openedPopup);
    }
  }

function openPopup (popupName) {
    popupName.classList.add('popup_active');

    document.addEventListener('keydown', handleClosePopupByEsc);
}

function closePopup (popupName) {
    popupName.classList.remove('popup_active');

    document.removeEventListener('keydown', handleClosePopupByEsc);
}

function editInformation (evt) {
    profileName.textContent = newProfileName.value;
    profileDescription.textContent = newProfileDescription.value;
    closePopup(renamePopup)
    evt.preventDefault();
}

function createNewCard (event) {
    addCard(gridArea, createCard(cardTitle.value, cardLink.value));
    closePopup(addPopup);
    event.preventDefault();
}

initialCards.forEach (function (item) {
    addCard(gridArea, createCard(item.name, item.link));

});
  
openNameEditor.addEventListener('click', function () {
    newProfileName.value = profileName.textContent;
    newProfileDescription.value = profileDescription.textContent;
    openPopup(renamePopup)
}); 


formEdit.addEventListener('submit', editInformation);

openCardEditor.addEventListener('click', function () {
    addForm.reset();
    disableButtonState(subminButton, validationElements.inactiveButtonClass)
    openPopup(addPopup)});


addForm.addEventListener('submit', createNewCard);



popupAreaList.forEach((popup) => {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup_active') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
})
