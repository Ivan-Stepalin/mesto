let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.form__close-icon');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let nameBox = document.querySelector('.form__input-box');

function popupOn() {
    popup.classList.add('popup_opened');
}
function popupOff() {
    popup.classList.remove('popup_opened');
}

function popupOpen() {
    nameBox.innerHTML = `<input type="text" value="${profileName.textContent}" class="form__field form__field_name">
                                <input type="text" value="${profileJob.textContent}" class="form__field form__field_job">`;
}
buttonEdit.addEventListener('click', popupOpen);

buttonEdit.addEventListener('click', popupOn);
closeButton.addEventListener('click', popupOff);

let formElement = document.querySelector('.form');
function formSubmitHandler (event) {
    event.preventDefault(); 
    let nameInput = formElement.querySelector('.form__field_name');
    let jobInput = formElement.querySelector('.form__field_job');
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
}
formElement.addEventListener('submit', formSubmitHandler); 
formElement.addEventListener('submit', popupOff); 



