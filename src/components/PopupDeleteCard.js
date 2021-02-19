import {Popup} from'./Popup.js'

export class PopupDeleteCard extends Popup {
    constructor(popup, handlerDeleteCard) {
        super(popup);
        this._handlerDeleteCard = handlerDeleteCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._handlerDeleteCard(this._element, this._data);
        })
    }


    open = (item, data) => {
        super.open();
        this._element = item;
        this._data = data
    }
}