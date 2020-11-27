let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_value_name');
let jobInput = formElement.querySelector('.popup__field_value_job');

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
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 
buttonEdit.addEventListener('click', popupOn);
closeButton.addEventListener('click', popupOff);

