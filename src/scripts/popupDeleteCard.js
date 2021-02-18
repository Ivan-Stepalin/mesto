import {Popup} from'./popup.js'

export class PopupDeleteCard extends Popup {
    constructor(popup, handlerDeleteCard) {
        super(popup);
        this._handlerDeleteCard = handlerDeleteCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (evt)=>{
            evt.preventDefault();
            this._handlerDeleteCard(this._element);
        })
    }


    open = (item) => {
        super.open();
        this._element = item;
    }
}