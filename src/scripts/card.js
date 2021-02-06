export class Card {
    constructor(data, templateElement, handleCardClick) {
        this._handleCardClick = handleCardClick;
        this._name = data.name;
        this._link = data.link;
        this._templateElement = templateElement;
    }
  
    composeCard() {
        this._newCard = document.querySelector(this._templateElement).content.cloneNode(true);
        const imgElement = this._newCard.querySelector('.element__image');
        imgElement.addEventListener('click', this._handleCardClick);
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
    _removeCard=(event)=>{
        event.target.closest('.element').remove();
        this._newCard = null;
    };
    _showLike=(event)=>{
        event.target.classList.toggle('element__group_active');
    };
}