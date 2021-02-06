export class UserInfo {
    constructor(elementName, elementInfo){
        this._elementName =  document.querySelector(elementName);
        this._elementInfo =  document.querySelector(elementInfo);
        this._formTitleName = document.querySelector('.popup__field_value_name');
        this._formTitleInfo = document.querySelector('.popup__field_value_job');
    }

    getUserInfo() {
        const data = {};
        data.name = this._elementName.textContent;
        data.info = this._elementInfo.textContent;
        return data;
    }

    setUserInfo() {
        this._elementName.textContent = this._formTitleName.value;
        this._elementInfo.textContent = this._formTitleInfo.value;
    }
}