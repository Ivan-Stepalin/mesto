let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup-box__close-icon');
let submitButton = document.querySelector('.popup-box__submit-button');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let nameBox = document.querySelector('.popup-box__input-box');
let formElement = document.querySelector('.popup-box');
let nameInput = formElement.querySelector('.popup-box__field_value_name');
let jobInput = formElement.querySelector('.popup-box__field_value_job');

function popupOn() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
function popupOff() {
    popup.classList.remove('popup_opened');
}
function formSubmitHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 
submitButton.addEventListener('click', popupOff);
buttonEdit.addEventListener('click', popupOn);
closeButton.addEventListener('click', popupOff);

