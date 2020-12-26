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
const submitButton = popupTitle.querySelector('.popup__submit-button')


const cardContainerElement = document.querySelector('.elements');
const templateElement = document.querySelector('.template').content;

function composeCard(item){
    const newCard = templateElement.cloneNode(true);
    const imgElement = newCard.querySelector('.element__image');
    imgElement.addEventListener('click', ()=>openImgPopup(item));
    const headerElement = newCard.querySelector('.element__name');
    headerElement.textContent = item.name;
    imgElement.src = item.link;
    imgElement.alt = item.name;
    const removeButton = newCard.querySelector('.element__bracket');
    removeButton.addEventListener('click', removeCard);
    const likeButton = newCard.querySelector('.element__group');
    likeButton.addEventListener('click', showLike);
    return newCard;
}

function generateCardGrid () {
    const cardInfo = initialCards.map(composeCard);
    cardContainerElement.prepend(...cardInfo);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown',closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown',closePopupByEsc);
}

function showLike(event){
    event.target.classList.toggle('element__group_active');
}

function removeCard(event){
    event.target.closest('.element').remove();
}

function openImgPopup(item){
    picturePopup.src = item.link;
    picturePopup.alt = item.name;
    picturePopupName.textContent = item.name;
    openPopup(popupImgContainer);
}


function openEditProfilePopup() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupTitle);
    setButtonState(submitButton, popupFormTitle.checkValidity(), validationConfig);
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

function ClearForm(popup, config) {
    closePopup(popup);
    deleteErrors(popup, config);
    if (popup === popupElement){
        resetForm(popup, config)
    }
}

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    initialCards.unshift({name: inputTitle.value, link: inputLink.value});
    const addCard = composeCard(initialCards[0]);
    cardContainerElement.prepend(addCard);
    ClearForm(popupElement, validationConfig);
}

const closePopupByEsc = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if (evt.key === `Escape`){
        closePopup(popupHandler)
        if(popupHandler !== picturePopup){
            ClearForm(popupHandler, validationConfig);
        }
    }
}

const closePopupByOverlay = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if(evt.target === popupHandler){
        closePopup(popupHandler)    
        if(popupHandler !== picturePopup){
            ClearForm(popupHandler, validationConfig)
        }
    }
}

popupTitle.addEventListener('submit', editUserProfilePopupSubmitHandler);
popupElement.addEventListener('submit', addCardSubmitHandler);
editButton.addEventListener('click', openEditProfilePopup);
closeButtonEditTitle.addEventListener('click', ()=>ClearForm(popupTitle, validationConfig));
addButton.addEventListener('click', ()=>openPopup(popupElement));
closeButtonAddElement.addEventListener('click', ()=>ClearForm(popupElement, validationConfig));
closeButtonImg.addEventListener('click', ()=>closePopup(popupImgContainer));
generateCardGrid();
enableValidation(validationConfig);


