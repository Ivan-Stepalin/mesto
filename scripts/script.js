const popupTitle = document.querySelector('.popup_title');
const popupElement = document.querySelector('.popup_element');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEditTitle = popupTitle.querySelector('.popup__close-icon');
const closeButtonAddElement = popupElement.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupTitle.querySelector('.popup__field_value_name');
const inputJob = popupTitle.querySelector('.popup__field_value_job');
const inputTitle = popupElement.querySelector('.popup__field_value_title');
const inputLink = popupElement.querySelector('.popup__field_value_link');
const addButton = document.querySelector('.profile__add-button');
const popupImgContainer = document.querySelector('.popup_image');
const picturePopup = popupImgContainer.querySelector('.popup__image');
const picturePopupName = popupImgContainer.querySelector('.popup__image-name');
const closeButtonImg = popupImgContainer.querySelector('.popup__close-icon');

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

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 
    initialCards.unshift({name: inputTitle.value, link: inputLink.value});
    const addCard = composeCard(initialCards[0]);
    cardContainerElement.prepend(addCard);
    closePopup(popupElement);
    popupElement.querySelector('.popup__form').reset();
}

popupTitle.addEventListener('submit', editTitleSubmitHandler); 
popupElement.addEventListener('submit', addCardSubmitHandler); 
editButton.addEventListener('click', editPopup);
closeButtonEditTitle.addEventListener('click', ()=>closePopup(popupTitle));
addButton.addEventListener('click', ()=>openPopup(popupElement));
closeButtonAddElement.addEventListener('click', ()=>closePopup(popupElement));
closeButtonImg.addEventListener('click', ()=>closePopup(popupImgContainer));
generateCardGrid();


