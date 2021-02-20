import {Api} from '../components/Api.js';
import {PopupDeleteCard} from '../components/PopupDeleteCard.js';
import {validationConfig} from '../utils/validationConfig.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
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

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/",
    headers: {
        "Authorization": "d51ae317-8999-42e3-a61f-4d1c740f977c",
        "Content-Type": "application/json"
    }
})

let parsedData;
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');
api.getUserInfo((data)=>{
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data)
    parsedData = data;
}).catch((err)=>{
    console.log(`ошибка ${err}`);
})

function renderCard(item) {
    const card = new Card (
        parsedData,
        item, 
        'template', 
        ()=>popupWithImage.open(item.name, item.link),
        (evt)=>deletePopup.open(evt.target.parentElement, item),
        ()=>{
            if(card.isLike(item)){
                api.disLikeCard(item._id, (data)=>{ 
                    item = data;                          
                    card.likeCard(item);
                }).catch((err)=>{
                    console.log(`ошибка ${err}`);
                  })
            } else {
                api.likeCard(item._id, (data)=>{
                    item = data;
                    card.likeCard(item);
                }).catch((err)=>{
                    console.log(`ошибка ${err}`);
                  })
            }           
        }    
    );
    const cardElement = card.composeCard();
    cardList.addItem(cardElement);
}

const deletePopup = new PopupDeleteCard('.popup_confim', (element, data)=>{
    api.deleteCard(data._id, ()=>{
        element.remove();
        element = null;
    }).catch((err)=>{
        console.log(`ошибка ${err}`);
      })
    deletePopup.close();
})
deletePopup.setEventListeners();

const cardList = new Section({
    renderer: (item) => {
        renderCard(item);
    }
}, cardContainerElement)

api.initialCard(data => {
    cardList.renderItems(data);
}).catch((err)=>{
    console.log(`ошибка ${err}`);
})

const popupWithImage = new PopupWithImage(".popup_image", ".popup__image", ".popup__image-name");
popupWithImage.setEventListeners();

const validateEditProfileForm = new FormValidator(validationConfig, popupTitle);
validateEditProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(validationConfig, popupElement);
validateAddCardForm.enableValidation();

const validateUpdateAvatarForm = new FormValidator(validationConfig, popupAvatar);
validateUpdateAvatarForm.enableValidation();

const popupAddCardForm = new PopupWithForm('.popup_element', (inputsData) => {
    api.addCard(inputsData, (data)=>{
        renderCard(data);      
    }, (isLoading)=>{
        isLoading ? popupAddCardButton.textContent = `Сохранение...` : (
            popupAddCardButton.textContent = `Сохранить`,
            popupAddCardForm.close()
        )
    }).catch((err)=>{
        console.log(`ошибка ${err}`);
    });
})
popupAddCardForm.setEventListeners();

editButton.addEventListener('click', ()=>{
    const profileInfo = userInfo.getUserInfo();
    inputName.value = profileInfo.name;
    inputJob.value = profileInfo.about;
    validateEditProfileForm.deleteErrors();
    validateEditProfileForm.setButtonState(popupTitle.querySelector(validationConfig.submitButtonSelector), popupFormTitle.checkValidity());
    popupEditTitleForm.open();
})

addButton.addEventListener('click', ()=>{
    validateAddCardForm.deleteErrors();
    validateAddCardForm.setButtonState(popupElement.querySelector(validationConfig.submitButtonSelector), popupFormElement.checkValidity());
    popupAddCardForm.open();
})

const popupEditTitleForm = new PopupWithForm('.popup_title', (inputsData) => {
    api.sendUserInfo(inputsData, (data)=>{
        userInfo.setUserInfo(data);
    }, (isLoading) =>{
        isLoading ? popupEditTitleButton.textContent = `Сохранение...` : (
            popupEditTitleButton.textContent = `Сохранить`,
            popupEditTitleForm.close()
        )
    }).catch((err)=>{
        console.log(`ошибка ${err}`);
    })
});
popupEditTitleForm.setEventListeners();

const avatarUpdate = new PopupWithForm('.popup_avatar-update', (inputData)=>{
    api.updateAvatar(inputData.avatar, (data)=>{
        userInfo.setAvatar(data);
        avatarUpdate.close();
    }, (isLoading)=>{
        isLoading ? popupAvatarApplyButton.textContent = `Сохранение...` : (
            popupAvatarApplyButton.textContent = `Сохранить`,
            avatarUpdate.close()
        ) 
    }).catch((err)=>{
        console.log(`ошибка ${err}`);
      })
})
avatarUpdate.setEventListeners();

avatarButton.addEventListener('click', ()=>{
    avatarUpdate.open()
    validateUpdateAvatarForm.deleteErrors();
    validateUpdateAvatarForm.setButtonState(popupAvatar.querySelector(validationConfig.submitButtonSelector), popupFormAvatar.checkValidity());
})