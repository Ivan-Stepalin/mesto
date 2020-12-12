const popupTitle = document.querySelector('.popup_title');
const popupElement = document.querySelector('.popup_element');
const buttonEdit = document.querySelector('.profile__edit-button');
const closeButtonTitle = popupTitle.querySelector('.popup__close-icon');
const closeButtonElement = popupElement.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupTitle.querySelector('.popup__field_value_name');
const jobInput = popupTitle.querySelector('.popup__field_value_job');
const titleInput = popupElement.querySelector('.popup__field_value_title');
const linkInput = popupElement.querySelector('.popup__field_value_link');
const addButton = document.querySelector('.profile__add-button');
const popupImgContainer = document.querySelector('.popup_image');
const picturePopup = popupImgContainer.querySelector('.popup__image');
const picturePopupName = popupImgContainer.querySelector('.popup__image-name');
const closeButtonImg = popupImgContainer.querySelector('.popup__close-icon');

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
    const imgButton = newCard.querySelector('.element__image');
    imgButton.addEventListener('click', openImgPopup);
    closeButtonImg.addEventListener('click', ()=>closePopup(popupImgContainer));
    const removeButton = newCard.querySelector('.element__bracket');
    removeButton.addEventListener('click', removeCard);
    const likeButton = newCard.querySelector('.element__group');
    likeButton.addEventListener('click', showLike);
    imgElement.addEventListener('click', ()=>openImgPopup(item));
    return newCard;
}

function generateCardGrid () {
    let cardInfo = initialCards.map(composeCard);
    cardContainerElement.prepend(...cardInfo);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function showLike(event){
    event.target.classList.toggle('element__group_active');
}

function removeCard(event){
    event.target.parentElement.remove();
}

function openImgPopup(item){
    picturePopup.src = item.link;
    picturePopup.alt = item.name;
    picturePopupName.textContent = item.name;
    openPopup(popupImgContainer);
}

function editPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupTitle);
}

function editTitleSubmitHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupTitle);
}

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    initialCards.unshift({name: titleInput.value, link: linkInput.value});
    const addCard = composeCard(initialCards[0]);
    cardContainerElement.prepend(addCard);
    closePopup(popupElement);
}

popupTitle.addEventListener('submit', editTitleSubmitHandler); 
popupElement.addEventListener('submit', addCardSubmitHandler); 
buttonEdit.addEventListener('click', editPopup);
closeButtonTitle.addEventListener('click', ()=>closePopup(popupTitle));
addButton.addEventListener('click', ()=>openPopup(popupElement));
closeButtonElement.addEventListener('click', ()=>closePopup(popupElement));
generateCardGrid();


