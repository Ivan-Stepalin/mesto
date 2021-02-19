export class FormValidator {
    constructor (objectWithClass, elementForValidation) {
        this.elementForValidation = elementForValidation;
        this.objectWithClass = objectWithClass;
        this._inputList = this.elementForValidation.querySelectorAll(this.objectWithClass.inputSelector);
        this._submitButton = this.elementForValidation.querySelector(this.objectWithClass.submitButtonSelector);   
    };

    _showError(input) {
        const error =this.elementForValidation.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this.objectWithClass.inputInvalidClass);
    };
    
    _hideError(input) {
        const error = this.elementForValidation.querySelector(`#${input.id}-error`);
        error.textContent = ``;
        input.classList.remove(this.objectWithClass.inputInvalidClass);
    };
    
    _checkInputValidity(input) {
        if(input.validity.valid) {
            this._hideError(input);
        }else {
            this._showError(input);
        }
    };
    
    setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this.objectWithClass.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this.objectWithClass.buttonInvalidClass);
            button.disabled = true; 
        }
    };

    deleteErrors() {
        this.elementForValidation.querySelectorAll(this.objectWithClass.inputSelector).forEach(item => {
            item.classList.remove(this.objectWithClass.inputInvalidClass);
        })
        this.elementForValidation.querySelectorAll(this.objectWithClass.spanSelector).forEach(item => {
            item.textContent = ``;
        })
    };
       
    _setEventListeners(){
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.setButtonState(this._submitButton, this.elementForValidation.querySelector(this.objectWithClass.formSelector).checkValidity());
            });
        });
    };
    
    enableValidation=()=>{
        this._setEventListeners();
        this.setButtonState(this._submitButton, this.elementForValidation.querySelector(this.objectWithClass.formSelector).checkValidity());
    };
}