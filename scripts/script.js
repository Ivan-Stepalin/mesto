const popupTitle = document.querySelector('.popup_title');
const popupElement = document.querySelector('.popup_element');
const buttonEdit = document.querySelector('.profile__edit-button');
const closeButtonTitle = document.querySelector('.popup__close-icon_title');
const closeButtonElement = document.querySelector('.popup__close-icon_element');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formTitle = document.querySelector('.popup__form_title');
const nameInput = formTitle.querySelector('.popup__field_value_name');
const jobInput = formTitle.querySelector('.popup__field_value_job');
const formElement = document.querySelector('.popup__form_element');
const titleInput = document.querySelector('.popup__field_value_title');
const linkInput = document.querySelector('.popup__field_value_link');
const addButton = document.querySelector('.profile__add-button');



let initialCards = [
    {   name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {   name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {   name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {   name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {   name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {   name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]; 

const cardContainerElement = document.querySelector('.elements');
const templateElement = document.querySelector('.template').content;

function composeCard(item){
    const newCard = templateElement.cloneNode(true);
    const imgElement = newCard.querySelector('.element__image');
    const headerElement = newCard.querySelector('.element__name');
    const imgPopup = newCard.querySelector('.popup__image');
    const imgPopupName = newCard.querySelector('.popup__image-name');
    headerElement.textContent = item.name;
    imgElement.src = item.link;
    imgElement.alt = item.name;
    imgPopupName.textContent = item.name;
    imgPopup.alt = item.name;
    imgPopup.src = item.link;
    addRemoveCloseLikeListenersToItem(newCard)
    return newCard;
}

function addRemoveCloseLikeListenersToItem(item){       
    const imgButton = item.querySelector('.popup__image-button');
    imgButton.addEventListener('click', imgOpenPopup);
    const CloseButtonImg = item.querySelector('.popup__close-icon_image');
    CloseButtonImg.addEventListener('click', imgClosePopup)
    const removeButton = item.querySelector('.element__bracket');
    removeButton.addEventListener('click', removeCard);
    const likeButton = item.querySelector('.element__group');
    likeButton.addEventListener('click', likeActive);
}

function likeActive(event){
    const like = event.target.closest('.element__group');
    like.classList.toggle('element__group_active')
}

function removeCard(event){
    const Card = event.target.closest('.element__bracket');
    const deconsteCard = Card.parentElement;
    deconsteCard.remove();
}

function imgClosePopup(event){
    const targetItem = event.target.closest('.popup__close-icon_image');
    const targetCard = targetItem.parentElement.parentElement
    targetCard.classList.remove('popup_opened');
}

function imgOpenPopup(event){
    const targetItem = event.target.closest('.popup__image-button');
    const targetCard = targetItem.nextElementSibling
    targetCard.classList.add('popup_opened');
}

function cardUpload () {
    let cardInfo = initialCards.map(composeCard);
    cardContainerElement.prepend(...cardInfo);
}

function popupTitleOn() {
    popupTitle.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function popupElementOn() {
    popupElement.classList.add('popup_opened');
}

function popupTitleOff() {
    popupTitle.classList.remove('popup_opened');
}

function popupElementOff() {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupTitle.classList.remove('popup_opened');
}

function formAddElement (evt) {
    evt.preventDefault(); 
    popupElement.classList.remove('popup_opened');
    initialCards.unshift({name: titleInput.value, link: linkInput.value});
    cardUpload();
}



formTitle.addEventListener('submit', formSubmitHandler); 
formElement.addEventListener('submit', formAddElement); 
buttonEdit.addEventListener('click', popupTitleOn);
closeButtonTitle.addEventListener('click', popupTitleOff);
addButton.addEventListener('click', popupElementOn);
closeButtonElement.addEventListener('click', popupElementOff);
cardUpload();


