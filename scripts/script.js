const popupTitle = document.querySelector('.popup_title');
const popupElement = document.querySelector('.popup_element');
const buttonEdit = document.querySelector('.profile__edit-button');
const closeButtonTitle = document.querySelector('.popup__close-icon_title');
const closeButtonElement = document.querySelector('.popup__close-icon_element');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupTitle.querySelector('.popup__field_value_name');
const jobInput = popupTitle.querySelector('.popup__field_value_job');
const titleInput = popupElement.querySelector('.popup__field_value_title');
const linkInput = popupElement.querySelector('.popup__field_value_link');
const addButton = document.querySelector('.profile__add-button');
const imgPopup = document.querySelector('.popup__image');
const imgPopupName = document.querySelector('.popup__image-name');
const CloseButtonImg = document.querySelector('.popup__close-icon_image');
const popupImg = document.querySelector('.popup_image')

let initialCards = [
    {   name: 'Дом', link: 'https://images.unsplash.com/photo-1607435655201-1c8db5afc449?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
    {   name: 'Капучино', link: 'https://images.unsplash.com/photo-1607278967764-548cbaa2d492?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
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
    headerElement.textContent = item.name;
    imgElement.src = item.link;
    imgElement.alt = item.name;
    const removeButton = newCard.querySelector('.element__bracket');
    removeButton.addEventListener('click', removeCard);
    const likeButton = newCard.querySelector('.element__group');
    likeButton.addEventListener('click', showLike);
    imgElement.addEventListener('click', OpenImgPopup);
    return newCard;
}


function showLike(event){
    const like = event.target.classList.toggle('element__group_active');
}

function removeCard(event){
    const Card = event.target.parentElement.remove();
}

function OpenImgPopup(event){
    imgPopup.src = event.target.getAttribute('src');
    imgPopup.alt =event.target.getAttribute('alt');
    imgPopupName.textContent = event.target.getAttribute('alt');
    popupImg.classList.toggle('popup_opened')
}

function uploadCard () {
    let cardInfo = initialCards.map(composeCard);
    cardContainerElement.prepend(...cardInfo);
}

function openPopup(popup) {
    popup.classList.toggle('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
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
    const addCard = initialCards.slice(0, 1).map(composeCard);
    cardContainerElement.prepend(...addCard);
}

CloseButtonImg.addEventListener('click', ()=>openPopup(popupImg))
popupTitle.addEventListener('submit', formSubmitHandler); 
popupElement.addEventListener('submit', formAddElement); 
buttonEdit.addEventListener('click', ()=>openPopup(popupTitle));
closeButtonTitle.addEventListener('click', ()=>openPopup(popupTitle));
addButton.addEventListener('click', ()=>openPopup(popupElement));
closeButtonElement.addEventListener('click', ()=>openPopup(popupElement));
uploadCard();


