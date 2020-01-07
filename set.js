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

    //  Given two sets, this returns a new set with the elements from both
    // given sets
    union(otherSet) {
        const unionSet = new Set();
        let values = this.values();
        for (let i = 0, length = this.size(); i < length; i++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for (let i = 0, length = otherSet.size(); i < length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    }

    // Given two sets, this returns a new set with the elements that
    // exist in both sets
    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        for (let i = 0, length = this.size(); i < length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    //  Given two sets, this returns a new set with all elements that
    // exist in the first set and do not exist in the second set
    difference(otherSet) {
        const differenceSet = new Set();
        const values = this.values();

        for (let i = 0, length = this.size(); i < length; i++) {
            if (!otherSet.has(values[i])) {
                differenceSet.add(values[i])
            }
        }

        return differenceSet;
    }

    // This confirms whether a given set is a subset of another set
    subset(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            const values = this.values();
            for (let i = 0, length = this.size(); i < length; i++) {
                if (!otherSet.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    }
}
module.exports = Set;
