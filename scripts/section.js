export class Section {
    constructor ({items, renderer}, containerSelector){
        this._rendererItems = items;
        this._renderer = renderer;
        this._container =containerSelector
    }

    addItem(element) {
        this._container.append(element);
    }
    
    renderItems() {
        this._rendererItems.forEach(item => {
            this._renderer(item);
        })
    }
}