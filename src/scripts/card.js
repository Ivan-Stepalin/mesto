export class Card {
    constructor(owner, data, templateElement, handleCardClick, handleDeleteCardClick, handleLikeCard) {
        this._handleCardClick = handleCardClick;
        this._name = data.name;
        this._link = data.link;
        this._templateElement = templateElement;
        this._like = data.likes.length;
        this._cardOwnerId = data.owner._id
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeCard = handleLikeCard;
        this._owner = owner
        this._data = data
    }
  
    composeCard() {
        this._newCard = document.querySelector(this._templateElement).content.cloneNode(true);
        const imgElement = this._newCard.querySelector('.element__image');
        imgElement.addEventListener('click', this._handleCardClick);
        const headerElement = this._newCard.querySelector('.element__name');
        headerElement.textContent = this._name;
        imgElement.src = this._link;
        imgElement.alt = this._name;
        this._newCard.querySelector('.element__group-count').textContent = this._like;
        const removeButton = this._newCard.querySelector('.element__bracket');
        removeButton.addEventListener('click', this._handleDeleteCardClick);
        if (this._cardOwnerId !== this._owner._id) {
            removeButton.classList.add('element__bracket_disabled')
        }
        const likeButton = this._newCard.querySelector('.element__group');
        likeButton.addEventListener('click', this._handleLikeCard);
        if (this.isLike(this._data)){
            likeButton.classList.toggle('element__group_active')
        }
        return this._newCard;
    };
    
    isLike(data) {
        return data.likes.some(like => {
          return like._id === this._owner._id;
        })
      }
      
    isBlack(data) {
        if (data.classList.contains('element__group_active')){
            return true
        } else {return false}  
    }
}