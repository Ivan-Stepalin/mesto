import {Popup} from './popup.js'

export class PopupWithForm extends Popup {
    constructor(popup, formSubmit) {
        super(popup);
        this._formSubmit = formSubmit;
        this._form = this.popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__field');
    }

    _getInputValues() {
        const data = {};
        this._inputList.forEach(item => {
            data[item.name] = item.value;
        })
        return data
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}