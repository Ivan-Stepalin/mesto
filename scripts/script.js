import {initialCards} from './initial-cards.js'
import {validationConfig} from './validationConfig.js'
import {Card} from './card.js'
import {FormValidator} from './formValidator.js'
import {Section} from './section.js'
import {PopupWithImage} from './popupWithImage.js'
import {PopupWithForm} from './popupWithForm.js'
import {UserInfo} from './userInfo.js'
import {Popup} from './popup.js'

const popupTitle = document.querySelector('.popup_title');
const popupElement = document.querySelector('.popup_element');
const popupFormTitle = popupTitle.querySelector('.popup__form_title');
const popupFormElement = popupElement.querySelector('.popup__form_element');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupFormTitle.querySelector('.popup__field_value_name');
const inputJob = popupFormTitle.querySelector('.popup__field_value_job');
const inputTitle = popupFormElement.querySelector('.popup__field_value_title');
const inputLink = popupFormElement.querySelector('.popup__field_value_link');
const addButton = document.querySelector('.profile__add-button');
const cardContainerElement = document.querySelector('.elements');


const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card (item, 'template', ()=>popupWithImage.open(item.name, item.link));
        const cardElement = card.composeCard(card);
        cardList.addItem(cardElement);
    }
}, cardContainerElement)

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');
/* userInfo.getUserInfo(); */
/* const popupEdit = new Popup ('.popup_title'); */
const popupWithImage = new PopupWithImage(".popup_image", ".popup__image", ".popup__image-name");
const validateEditProfileForm = new FormValidator(validationConfig, popupTitle);
validateEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(validationConfig, popupElement);
validateAddCardForm.enableValidation();

editButton.addEventListener('click', ()=>{
    const profileInfo = userInfo.getUserInfo();
    inputName.value = profileInfo.name;
    inputJob.value = profileInfo.info;
    validateEditProfileForm.clearForm();
    validateEditProfileForm.setButtonState(popupTitle.querySelector(validationConfig.submitButtonSelector), popupFormTitle.checkValidity());
    popupEditForm.open()
})

const popupEditForm = new PopupWithForm('.popup_title', (data) => {
    userInfo.setUserInfo(data);
    popupEditForm.close();
});
popupEditForm.setEventListeners()

/* function openEditProfilePopup() {
    popupEdit.open();
    popupForm.
    validateEditProfileForm.clearForm();
    validateEditProfileForm.setButtonState(popupTitle.querySelector(validationConfig.submitButtonSelector), popupFormTitle.checkValidity())
} */



/* function openAddCardPopup() {

    validateAddCardForm.clearForm();
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
} */

/* popupTitle.addEventListener('submit', editUserProfilePopupSubmitHandler);
popupElement.addEventListener('submit', addCardSubmitHandler);
editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddCardPopup); */
cardList.renderItems()


/* closeButtonAddElement.addEventListener('click', ()=>closePopup(popupElement)); */
/* closeButtonImg.addEventListener('click', ()=>closePopup(popupImgContainer)); */
/* closeButtonEditTitle.addEventListener('click', ()=>closePopup(popupTitle)); */
/* renderElements() */



/* const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown',closePopupByEsc);
} */

/* function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown',closePopupByEsc);
} */


/* const closePopupByEsc = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if (evt.key === `Escape`){
        closePopup(popupHandler)
    }
} */

/* const closePopupByOverlay = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if(evt.target === popupHandler){
        closePopup(popupHandler)    
    }
} */


/* const popupImgContainer = document.querySelector('.popup_image');
const picturePopup = popupImgContainer.querySelector('.popup__image');
const picturePopupName = popupImgContainer.querySelector('.popup__image-name');
const closeButtonImg = popupImgContainer.querySelector('.popup__close-icon'); */

/* const closeButtonEditTitle = popupFormTitle.querySelector('.popup__close-icon');
const closeButtonAddElement = popupFormElement.querySelector('.popup__close-icon'); */