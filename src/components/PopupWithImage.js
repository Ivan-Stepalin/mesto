import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popup, image, imageName){
        super(popup);
        this._image = this.popup.querySelector(image);
        this._imageName = this.popup.querySelector(imageName);
    }

    open(name, link) { 
        this._imageName.textContent = name;    
        this._image.src = link;
        this._image.alt = name;
        super.open();
    }
}