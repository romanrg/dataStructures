class Dictionary {
    constructor() {
        this._items = {};
    }

    set(key, value) {
        this._items[key] = value;
    }

    remove(key) {
        if (this.has(key)) {
            delete this._items[key];
            return true
        }
        return  false;
    }

    has(key) {
        return this._items.hasOwnProperty(key);
    }

    get(key) {
        return this.has(key) ? this._items[key] : undefined;
    }

    clear() {
        this._items = {};
    }

    size() {
        return this.values().length;
    }

    keys() {
        return Object.keys(this._items);
    }

    values() {
        return Object.values(this._items);
    }
    getItems() {
        return this._items;
    }
}


