import {initialCards} from './initial-cards.js'
import {validationConfig} from './validationConfig.js'
import {Card} from './card.js'
import {FormValidator} from './formValidator.js'


const popupTitle = document.querySelector('.popup_title');
const popupElement = document.querySelector('.popup_element');
const popupFormTitle = popupTitle.querySelector('.popup__form_title');
const popupFormElement = popupElement.querySelector('.popup__form_element');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEditTitle = popupFormTitle.querySelector('.popup__close-icon');
const closeButtonAddElement = popupFormElement.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupFormTitle.querySelector('.popup__field_value_name');
const inputJob = popupFormTitle.querySelector('.popup__field_value_job');
const inputTitle = popupFormElement.querySelector('.popup__field_value_title');
const inputLink = popupFormElement.querySelector('.popup__field_value_link');
const addButton = document.querySelector('.profile__add-button');
const popupImgContainer = document.querySelector('.popup_image');
const picturePopup = popupImgContainer.querySelector('.popup__image');
const picturePopupName = popupImgContainer.querySelector('.popup__image-name');
const closeButtonImg = popupImgContainer.querySelector('.popup__close-icon');
const cardContainerElement = document.querySelector('.elements');

const renderElements = () => {
    initialCards.forEach((item) => {
        const card = new Card (item, 'template', openPopup);
        const cardElement = card.composeCard(card);
        cardContainerElement.append(cardElement);

    })
}

const checkValidation = () => {
    const formErrors = document.querySelectorAll('.popup__form');
    formErrors.forEach((formWithText) => {
        const validate = new FormValidator(validationConfig, formWithText);
        validate.enableValidation();
    })
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown',closePopupByEsc);
    if (popup !== picturePopup){
        clearForm(popup, validationConfig)
    }
    checkValidation();
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown',closePopupByEsc);
}

function openEditProfilePopup() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupTitle);
}

function openAddCardPopup() {
    openPopup(popupElement);
}

function editUserProfilePopupSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupTitle);
}

function resetForm(popup, config) {
    popup.querySelector(config.formSelector).reset();
}

function deleteErrors(popup, config) {
    popup.querySelectorAll(config.inputSelector).forEach(item => {
        item.classList.remove(config.inputInvalidClass)
    })
    popup.querySelectorAll(config.spanSelector).forEach(item => {
        item.textContent = ``
    })
}

function clearForm(popup, config) {
    deleteErrors(popup, config);
    if (popup === popupElement){
        resetForm(popup, config)
    }
}

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    const card = new Card({name: inputTitle.value, link: inputLink.value}, 'template');
    const cardElement = card.composeCard(card);
    cardContainerElement.prepend(cardElement);
    closePopup(popupElement);
}

const closePopupByEsc = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if (evt.key === `Escape`){
        closePopup(popupHandler)
    }
}

const closePopupByOverlay = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if(evt.target === popupHandler){
        closePopup(popupHandler)    
    }
}

/* function openImgPopup(evt) {
    picturePopup.src = evt.target.getAttribute('src');
    picturePopup.alt = evt.target.closest('.element').querySelector('.element__name').textContent;
    picturePopupName.textContent = evt.target.closest('.element').querySelector('.element__name').textContent;
    openPopup(popupImgContainer);
} */

/* function addListenerToElement() {
    document.querySelectorAll('.element').forEach((item)=>{item.addEventListener('click', openImgPopup)});
} */


popupTitle.addEventListener('submit', editUserProfilePopupSubmitHandler);
popupElement.addEventListener('submit', addCardSubmitHandler);
editButton.addEventListener('click', openEditProfilePopup);
closeButtonEditTitle.addEventListener('click', ()=>closePopup(popupTitle));
addButton.addEventListener('click', openAddCardPopup);
closeButtonAddElement.addEventListener('click', ()=>closePopup(popupElement));
closeButtonImg.addEventListener('click', ()=>closePopup(popupImgContainer));

renderElements()
/* addListenerToElement(); */