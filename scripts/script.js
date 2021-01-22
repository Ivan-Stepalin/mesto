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

const validateEditProfileForm = new FormValidator(validationConfig, popupTitle);
validateEditProfileForm.enableValidation();
const validateAddCardForm = new FormValidator(validationConfig, popupElement);
validateAddCardForm.enableValidation();

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown',closePopupByEsc);
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
    validateEditProfileForm.clearForm()
    validateEditProfileForm.setButtonState(popupTitle.querySelector(validationConfig.submitButtonSelector), popupFormTitle.checkValidity())
}

function openAddCardPopup() {
    openPopup(popupElement);
    validateAddCardForm.clearForm()
    validateAddCardForm.setButtonState(popupElement.querySelector(validationConfig.submitButtonSelector), popupFormElement.checkValidity())
}

function editUserProfilePopupSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupTitle);
}

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    const card = new Card({name: inputTitle.value, link: inputLink.value}, 'template', openPopup);
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

popupTitle.addEventListener('submit', editUserProfilePopupSubmitHandler);
popupElement.addEventListener('submit', addCardSubmitHandler);
editButton.addEventListener('click', openEditProfilePopup);
closeButtonEditTitle.addEventListener('click', ()=>closePopup(popupTitle));
addButton.addEventListener('click', openAddCardPopup);
closeButtonAddElement.addEventListener('click', ()=>closePopup(popupElement));
closeButtonImg.addEventListener('click', ()=>closePopup(popupImgContainer));

renderElements()