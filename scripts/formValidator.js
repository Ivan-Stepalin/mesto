export class FormValidator {
    constructor (objectWithClass, elementForValidation) {
        this.elementForValidation = elementForValidation;
        this.objectWithClass = objectWithClass;
        this._button = this.elementForValidation.querySelector('.popup__submit-button');
    }

    _showError(input) {
        const error =this.elementForValidation.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this.objectWithClass.inputInvalidClass);
    }

    _hideError(input) {
        const error = this.elementForValidation.querySelector(`#${input.id}-error`);
        error.textContent = ``;
        input.classList.remove(this.objectWithClass.inputInvalidClass);
    }

    _checkInputValidity(input) {
        if(input.validity.valid) {
            this._hideError(input)
        }else {
            this._showError(input)
        }
    }

    _setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this.objectWithClass.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this.objectWithClass.buttonInvalidClass);
            button.disabled = true; 
        }
    }

    _setEventListeners(){
        const inputList = this.elementForValidation.querySelectorAll(this.objectWithClass.inputSelector);
        const submitButton = this.elementForValidation.querySelector(this.objectWithClass.submitButtonSelector);
        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(submitButton, this.elementForValidation.checkValidity());
            });
        });
    }

    enableValidation = () => {
        const submitButton = this.elementForValidation.querySelector(this.objectWithClass.submitButtonSelector);
        this._setEventListeners();
        this._setButtonState(submitButton, this.elementForValidation.checkValidity());
    }
}