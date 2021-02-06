import {initialCards} from './initial-cards.js';
import {validationConfig} from './validationConfig.js';
import {Card} from './card.js';
import {FormValidator} from './formValidator.js';
import {Section} from './section.js';
import {PopupWithImage} from './popupWithImage.js';
import {PopupWithForm} from './popupWithForm.js';
import {UserInfo} from './userInfo.js';
import {popupTitle, 
        popupElement, 
        popupFormTitle, 
        popupFormElement, 
        editButton, 
        inputName, 
        inputJob, 
        addButton, 
        cardContainerElement
} from './utils.js';

import '../pages/index.css';

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card (item, 'template', ()=>popupWithImage.open(item.name, item.link));
        const cardElement = card.composeCard(card);
        cardList.addItem(cardElement);
    }
}, cardContainerElement);
cardList.renderItems();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupWithImage = new PopupWithImage(".popup_image", ".popup__image", ".popup__image-name");
popupWithImage.setEventListeners();

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
    popupEditTitleForm.open();
})

addButton.addEventListener('click', ()=>{
    validateAddCardForm.clearForm();
    validateAddCardForm.setButtonState(popupElement.querySelector(validationConfig.submitButtonSelector), popupFormElement.checkValidity());
    popupAddCardForm.open();
})

const popupEditTitleForm = new PopupWithForm('.popup_title', (data) => {
    userInfo.setUserInfo(data);
    popupEditTitleForm.close();
});
popupEditTitleForm.setEventListeners();

const popupAddCardForm = new PopupWithForm('.popup_element', (data) => {  
    const cardList = new Section({
        items: [data],
        renderer: () => {
            const card = new Card (data, 'template', ()=>popupWithImage.open(data.name, data.link));
            const cardElement = card.composeCard(card);
            cardList.addItem(cardElement);
        }}, cardContainerElement);
        cardList.renderItems();
});
popupAddCardForm.setEventListeners();