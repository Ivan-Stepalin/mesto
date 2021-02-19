const onError = (res)=>{
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Сервер не доступен')
  }

export class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

    getUserInfo(handleUserInfo) {
        return fetch(`${this._url}users/me`, {
            method: "GET",
            headers: this._headers
        })
        .then(onError)
        .then((res)=>{
            handleUserInfo(res)
        })
        .catch((err)=>{
            console.log(`ошибка ${err}`);
        })
    }

    sendUserInfo(inputData, handleUserInfo, renderLoading){
       renderLoading(true);
        return fetch(`${this._url}users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: inputData.name,
            about: inputData.about
          })
        })
        .then(onError)
        .then((res)=>{
            handleUserInfo(res)
        })
        .catch((err)=>{
            console.log(`ошибка ${err}`);
        })
        .finally(()=>{
          renderLoading(false);
        })
      }

      initialCard(handleGetCard) {
          return fetch(`${this._url}cards`, {
            headers: this._headers
          })
          .then(onError)
          .then((res)=>{
              handleGetCard(res)
          })
          .catch((err)=>{
            console.log(`ошибка ${err}`);
        })
      }

      addCard(inputData, handleAddCard, renderLoading) {
        renderLoading(true)
        return fetch(`${this._url}cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: inputData.name,
            link: inputData.link
          })
        })
        .then(onError)
        .then((res)=>{
            handleAddCard(res)
        })
        .catch((err)=>{
          console.log(`ошибка ${err}1111`);
      })
        .finally(()=>{
          renderLoading(false);
        })
      }

      deleteCard(idCard, handleDeleteCard) {
        return fetch(`${this._url}cards/${idCard}`, {
            method: "DELETE",
            headers: this._headers
          })
          .then(onError)
          .then((res)=>{
              handleDeleteCard(res)
          })
          .catch((err)=>{
            console.log(`ошибка ${err}`);
        })
      }

      likeCard(idCard, handleLikeCard) {
        return fetch(`${this._url}cards/likes/${idCard}`, {
          method: "PUT",
          headers: this._headers
        })
        .then(onError)
        .then((res)=>{
            handleLikeCard(res);
            return res;
        })
        .catch((err)=>{
          console.log(`ошибка ${err}`);
        })
      }

      disLikeCard(idCard, handleDisLikeCard) {
        return fetch(`${this._url}cards/likes/${idCard}`, {
          method: "DELETE",
          headers: this._headers
        })
        .then(onError)
        .then((res)=>{
            handleDisLikeCard(res);
        })
        .catch((err)=>{
          console.log(`ошибка ${err}`);
        })
      }

      updateAvatar(avatarLink, handleAddAvatar, renderLoading) {
        renderLoading(true)
        return fetch(`${this._url}users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatarLink
          })
        })
        .then(onError)
        .then((res)=>{
            handleAddAvatar(res)
        })
        .catch((err)=>{
          console.log(`ошибка ${err}`);
        })
        .finally(()=>{
          renderLoading(false)
        })
      }
}