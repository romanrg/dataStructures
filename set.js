class Set {
    constructor() {
        this._items = {};
    }

    // This adds a new item to the set
    add(item) {
        if(!this.has(item)) {
            this._items[JSON.stringify(item)] = item;
            return true;
        }
        return false;
    }

    // This removes the value from the set.
    remove(item) {
        if(this.has(item)) {
            delete this._items[JSON.stringify(item)];
            return true;
        }
        return false;
    }

    // This returns true if the value exists in the set and
    // false otherwise.
    has(item) {
        return this._items.hasOwnProperty(JSON.stringify(item));
    }

    //  This removes all the items from the set.
    clear() {
        this._items = {};
    }

    // This returns how many elements the set contains. It is similar
    // to the length property of the array
    size() {
        return Object.keys(this._items).length;
    }

    // This returns an array of all the values of the set.
    values() {
        return Object.values(this._items);
    }
}

