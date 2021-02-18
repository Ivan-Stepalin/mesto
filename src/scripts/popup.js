export class Popup {
    constructor(popup){
        this.popup = document.querySelector(popup);
        this._popupOpened = 'popup_opened';
        this._popupCloseIcon = 'popup__close-icon';
    }

    open() {
        this.popup.classList.add(this._popupOpened);
        this.popup.addEventListener('click', this._closePopupByOverlay);
        document.addEventListener('keydown', this._handleEscClose);
    };
    close() {
        this.popup.classList.remove(this._popupOpened);
        this.popup.removeEventListener('click', this._closePopupByOverlay);
        document.removeEventListener('keydown', this._handleEscClose);
    };
    _handleEscClose=(evt)=>{
        if (evt.key === `Escape`){
            this.close();
        }
    };
    setEventListeners() {
        this.popup.addEventListener('click', (evt)=> {
            if(evt.target.classList.contains(this._popupCloseIcon) || evt.target.classList.contains(this._popupOpened)) {
                this.close();
            }
        })
    };
}

