export class UserInfo {
    constructor(elementName, elementInfo, avatarElement){
        this._elementName =  document.querySelector(elementName);
        this._elementInfo =  document.querySelector(elementInfo);
        this._avatarElement = document.querySelector(avatarElement)
    }

    getUserInfo() {
        const data = {};
        data.name = this._elementName.textContent;
        data.about = this._elementInfo.textContent;
        return data;
    }

    setUserInfo(data) {
        this._elementName.textContent = data.name;
        this._elementInfo.textContent = data.about;
    }

    setAvatar(link){
        this._avatarElement.src = link.avatar;
    }
}