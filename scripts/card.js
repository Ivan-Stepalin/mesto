export class Card {
    constructor(data, templateElement, functionForOpen) {
        this._name = data.name;
        this._link = data.link;
        this._templateElement = templateElement;
        this._functionForOpen = functionForOpen
    }
    
    composeCard() {
        this._newCard = document.querySelector(this._templateElement).content.cloneNode(true);
        const imgElement = this._newCard.querySelector('.element__image');
        imgElement.addEventListener('click', this._openImgPopup)
        const headerElement = this._newCard.querySelector('.element__name');
        headerElement.textContent = this._name;
        imgElement.src = this._link;
        imgElement.alt = this._name;
        const removeButton = this._newCard.querySelector('.element__bracket');
        removeButton.addEventListener('click', this._removeCard);
        const likeButton = this._newCard.querySelector('.element__group');
        likeButton.addEventListener('click', this._showLike);
        return this._newCard;
    };
    
    _removeCard = (event) => {
        event.target.closest('.element').remove();
        this._newCard = null
    }

    _showLike = (event) => {
        event.target.classList.toggle('element__group_active');
    }
    
    _openImgPopup = (evt) => {
        const popupImgContainer = document.querySelector('.popup_image');
        const picturePopup = document.querySelector('.popup__image');
        const picturePopupName = document.querySelector('.popup__image-name');
        picturePopup.src = evt.target.getAttribute('src');
        picturePopup.alt = evt.target.closest('.element').querySelector('.element__name').textContent;
        picturePopupName.textContent = evt.target.closest('.element').querySelector('.element__name').textContent;
        this._functionForOpen(popupImgContainer);
    }  
}