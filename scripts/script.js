let popupTitle = document.querySelector('.popup_title');
let popupElement = document.querySelector('.popup_element');
let buttonEdit = document.querySelector('.profile__edit-button');
let closeButtonTitle = document.querySelector('.popup__close-icon_title');
let closeButtonElement = document.querySelector('.popup__close-icon_element');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formTitle = document.querySelector('.popup__form_title');
let nameInput = formTitle.querySelector('.popup__field_value_name');
let jobInput = formTitle.querySelector('.popup__field_value_job');
let formElement = document.querySelector('.popup__form_element');
let titleInput = document.querySelector('.popup__field_value_title');
let linkInput = document.querySelector('.popup__field_value_link');
let addButton = document.querySelector('.profile__add-button');



let initialCards = [
    {   name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {   name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {   name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {   name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {   name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {   name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]; 

let cardContainerElement = document.querySelector('.elements');
let templateElement = document.querySelector('.template').content;

function composeCard(item){
    let newCard = templateElement.cloneNode(true);
    let imgElement = newCard.querySelector('.element__image');
    let headerElement = newCard.querySelector('.element__name');
    let imgPopup = newCard.querySelector('.popup__image');
    let imgPopupName = newCard.querySelector('.popup__image-name');
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
    let imgButton = item.querySelector('.popup__image-button');
    imgButton.addEventListener('click', imgOpenPopup);
    let CloseButtonImg = item.querySelector('.popup__close-icon_image');
    CloseButtonImg.addEventListener('click', imgClosePopup)
    let removeButton = item.querySelector('.element__bracket');
    removeButton.addEventListener('click', removeCard);
    let likeButton = item.querySelector('.element__group');
    likeButton.addEventListener('click', likeActive);
}

function likeActive(event){
    let like = event.target.closest('.element__group');
    like.classList.toggle('element__group_active')
}

function removeCard(event){
    let Card = event.target.closest('.element__bracket');
    let deleteCard = Card.parentElement;
    deleteCard.remove();
}

function imgClosePopup(event){
    let targetItem = event.target.closest('.popup__close-icon_image');
    let targetCard = targetItem.parentElement.parentElement
    targetCard.classList.remove('popup_opened');
}

function imgOpenPopup(event){
    let targetItem = event.target.closest('.popup__image-button');
    let targetCard = targetItem.nextElementSibling
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


