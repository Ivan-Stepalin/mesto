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
const submitButton = document.querySelectorAll('.popup__submit-button')


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
    let cardInfo = initialCards.map(composeCard);
    cardContainerElement.prepend(...cardInfo);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupByOverlay);
    submitButton.forEach(item => {setButtonState(item, item.parentElement.checkValidity(), validationConfig)});
    document.addEventListener('keydown',closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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


function editPopup() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupTitle);
}

function editTitleSubmitHandler (event) {
    event.preventDefault(); 
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupTitle);
}

function resetForm(popup) {
    if(popup === popupElement) {
        popup.querySelector('.popup__form').reset();
    }
    popup.querySelectorAll('.popup__field').forEach(item => {
        item.classList.remove('popup__field_state_invalid')
    })
    popup.querySelectorAll('.popup__error').forEach(item => {
        item.textContent = ``
    })
}

function resetAndCloseForm(popup) {
    closePopup(popup);
    resetForm(popup);
}

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    initialCards.unshift({name: inputTitle.value, link: inputLink.value});
    const addCard = composeCard(initialCards[0]);
    cardContainerElement.prepend(addCard);
    resetAndCloseForm(popupElement);
}

function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = ``;
    input.classList.remove(config.inputInvalidClass);
}

function checkInputValidity(form, input, config) {
    if(input.validity.valid) {
        hideError(form, input, config)
    }else {
        showError(form, input, config)
    }
}

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = true; 
    }
}

function setEventListeners(form, config){
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListeners(form, config)
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config)
    })
}

const closePopupByEsc = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if (evt.key === `Escape`){
        closePopup(popupHandler)
        document.removeEventListener('keydown',closePopupByEsc)
        if(popupHandler !== picturePopup){
            resetForm(popupHandler)
        }
    }
}

const closePopupByOverlay = (evt) =>{
    const popupHandler = document.querySelector('.popup_opened')
    if(evt.target === popupHandler){
        closePopup(popupHandler)    
        if(popupHandler !== picturePopup){
            resetForm(popupHandler)
        }
    }
}

popupTitle.addEventListener('submit', editTitleSubmitHandler);
popupElement.addEventListener('submit', addCardSubmitHandler);
editButton.addEventListener('click', editPopup);
closeButtonEditTitle.addEventListener('click', ()=>resetAndCloseForm(popupTitle));
addButton.addEventListener('click', ()=>openPopup(popupElement));
closeButtonAddElement.addEventListener('click', ()=>resetAndCloseForm(popupElement));
closeButtonImg.addEventListener('click', ()=>closePopup(popupImgContainer));
generateCardGrid();
enableValidation(validationConfig);


