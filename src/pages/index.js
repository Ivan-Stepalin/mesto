import {initialCards} from '../utils/initial-cards';
import {validationConfig} from '../utils/validationConfig.js';
import {Card} from '../scripts/card.js';
import {FormValidator} from '../scripts/formValidator.js';
import {Section} from '../scripts/section.js';
import {PopupWithImage} from '../scripts/popupWithImage.js';
import {PopupWithForm} from '../scripts/popupWithForm.js';
import {UserInfo} from '../scripts/userInfo.js';
import {popupTitle, 
        popupElement, 
        popupFormTitle, 
        popupFormElement, 
        editButton, 
        inputName, 
        inputJob, 
        addButton, 
        cardContainerElement
} from '../utils/components.js';

import './index.css';

const createCard = (data) => {
    const card = new Card (data, 'template', ()=>popupWithImage.open(data.name, data.link));
    const cardElement = card.composeCard();
    cardList.addItem(cardElement);
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item);
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
            createCard(data);
        }}, cardContainerElement);
    cardList.renderItems();
    popupAddCardForm.close();
});
popupAddCardForm.setEventListeners();

