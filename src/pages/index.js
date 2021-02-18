import {Api} from '../scripts/api.js';
import {PopupDeleteCard} from '../scripts/popupDeleteCard.js';
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
        cardContainerElement,
        avatarButton,
        popupAvatar,
        popupFormAvatar,
        popupAvatarApplyButton,
        popupAddCardButton,
        popupEditTitleButton
} from '../utils/components.js';

import './index.css';

function renderCard(item) {
    const card = new Card (
        parsedData,
        item, 
        'template', 
        ()=>popupWithImage.open(item.name, item.link),
        (evt)=>{
            const deletePopup = new PopupDeleteCard('.popup_confim', (element)=>{
                api.deleteCard(item._id, ()=>{
                    element.remove();
                    element = null
                })
                deletePopup.close();
            })
            deletePopup.setEventListeners();
            deletePopup.open(evt.target.parentElement);
        },
        (evt)=>{
            if(card.isLike(item)){
                const likeElement = evt.target.parentElement;
                    api.disLikeCard(item._id, (data)=>{                           
                    likeElement.querySelector('.element__group').classList.toggle('element__group_active');
                    likeElement.querySelector('.element__group-count').textContent = (data.likes.length);
                    item = data;
                })
            } else {
                const likeElement = evt.target.parentElement;
                api.likeCard(item._id, (data)=>{
                    likeElement.querySelector('.element__group').classList.toggle('element__group_active');
                    likeElement.querySelector('.element__group-count').textContent = (data.likes.length);
                    item = data;
                })
            }           
        }    
    );
    return card
}

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/",
    headers: {
        "Authorization": "d51ae317-8999-42e3-a61f-4d1c740f977c",
        "Content-Type": "application/json"
    }
})

const popupWithImage = new PopupWithImage(".popup_image", ".popup__image", ".popup__image-name");
popupWithImage.setEventListeners();

const validateEditProfileForm = new FormValidator(validationConfig, popupTitle);
validateEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(validationConfig, popupElement);
validateAddCardForm.enableValidation();

const validateUpdateAvatarForm = new FormValidator(validationConfig, popupAvatar);
validateUpdateAvatarForm.enableValidation();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');
api.getUserInfo((data)=>{
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data)
    parsedData = data;
});

let parsedData;

api.initialCard(data => {
    const cardList = new Section({
        items: data,
        renderer: (item) => {
            const card = renderCard(item);             
            const cardElement = card.composeCard();
            cardList.addItem(cardElement);
        }
    }, cardContainerElement);
    cardList.renderItems();
})

const popupAddCardForm = new PopupWithForm('.popup_element', (inputsData) => {
    api.addCard(inputsData, (data)=>{
        const cardList = new Section({
            items: [data],
            renderer: () => {
                const card = renderCard(data)
                const cardElement = card.composeCard(card);
                cardList.addItem(cardElement);
            }}, cardContainerElement);
        cardList.renderItems();
    }, (isLoading)=>{
        isLoading ? popupAddCardButton.innerHTML = `Сохранение...` : (
            popupAddCardButton.innerHTML = `Сохранить`,
            popupAddCardForm.close()
        ) 
    })  
});
popupAddCardForm.setEventListeners();

editButton.addEventListener('click', ()=>{
    const profileInfo = userInfo.getUserInfo();
    inputName.value = profileInfo.name;
    inputJob.value = profileInfo.about;
    validateEditProfileForm.clearForm();
    validateEditProfileForm.setButtonState(popupTitle.querySelector(validationConfig.submitButtonSelector), popupFormTitle.checkValidity());
    popupEditTitleForm.open();
})

addButton.addEventListener('click', ()=>{
    validateAddCardForm.clearForm();
    validateAddCardForm.setButtonState(popupElement.querySelector(validationConfig.submitButtonSelector), popupFormElement.checkValidity());
    popupAddCardForm.open();
})

const popupEditTitleForm = new PopupWithForm('.popup_title', (inputsData) => {
    api.sendUserInfo(inputsData, (data)=>{
        userInfo.setUserInfo(data);
    }, (isLoading) =>{
        isLoading ? popupEditTitleButton.innerHTML = `Сохранение...` : (
            popupEditTitleButton.innerHTML = `Сохранить`,
            popupEditTitleForm.close()
        )
    })
});
popupEditTitleForm.setEventListeners();

const avatarUpdate = new PopupWithForm('.popup_avatar-update', (inputData)=>{
    api.updateAvatar(inputData.avatar, (data)=>{
        userInfo.setAvatar(data);
        avatarUpdate.close();
    }, (isLoading)=>{
        isLoading ? popupAvatarApplyButton.innerHTML = `Сохранение...` : (
            popupAvatarApplyButton.innerHTML = `Сохранить`,
            avatarUpdate.close()
        ) 
    })
})
avatarUpdate.setEventListeners();

avatarButton.addEventListener('click', ()=>{
    avatarUpdate.open()
    validateUpdateAvatarForm.clearForm();
    validateUpdateAvatarForm.setButtonState(popupAvatar.querySelector(validationConfig.submitButtonSelector), popupFormAvatar.checkValidity());
})