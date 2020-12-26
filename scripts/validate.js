function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = ``;
    input.classList.remove(config.inputInvalidClass);
}

function checkInputValidity(form, input, config) {
    if(input.validity.valid) {
        hideError(form, input, config)
    }else {
        showError(form, input, config)
    }
}

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remov-+e(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = true; 
    }
}

function setEventListeners(form, config){
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListeners(form, config)
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config)
    })
}