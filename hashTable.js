const LinkedList = require('./linkedList');

class HashFunctions {
    static loseloseHash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = hash +  key.charCodeAt(i);
        }
        return hash % 37;
    }

    static djb2HashCode(key) {

        let hash = 5381;
        for (let i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
    }

    static knuthMultiplicative(key) {
        return this.loseloseHash(key) * (2 ^ 32)
    }

    static hash32Shift(key) {
        let int = this.djb2HashCode(key);
        int = ~int + (int << 15);
        int = int ^ (int >>> 12);
        int = int + (int << 2);
        int = int ^ (int >>> 4);
        int = int * 2057;
        int = int ^ (int >>> 16);
        return Math.abs(int);
    }

}

class HashTable {
    constructor(hashFunction) {
        this._table = [];
        this._hashFunction = hashFunction;
    }

    _hashCode(key) {
        return this._hashFunction(key);
    }

    put(key, value) {
        const position = this._hashCode(key);
        this._table[position] = value;
    }

    remove(key) {
        this._table[this._hashCode(key)] = undefined;
    }

    get(key) {
        return this._table[this._hashCode(key)];
    }

    print() {
        console.log(JSON.stringify(this._table.filter(item => item !== undefined)));
    }
}

// if cell is not empty create linked list inside
class HashTableWithChainingCollision extends HashTable {
    constructor(hashFunction) {
        super(hashFunction);
    }

    put(key, value) {
        const position = this._hashCode(key);

        if (this._table[position] === undefined) {
            this._table[position] = new LinkedList();
        }
        this._table[position].append({key, value});
    }

    get(key) {
        const position = this._hashCode(key);
        if (this._table[position] !== undefined) {
            let current = this._table[position].getHead();
            while (current.next) {
                if (current.item.key === key) {
                    return current.item.value;
                }
                current = current.next;
            }

            if (current.item.key === key) {
                return current.item.value;
            }
        }
        return undefined;
    }

    remove(key) {
        const position = this._hashCode(key);
        if (this._table[position] === undefined) {
            let current = this._table[position];
            while (current.next) {
                if (current.item.key === key) {
                    this._table[position].remove(current.item);
                    if (this._table[position].isEmpty()) {
                        this._table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }

            if (current.item.key === key) {
                this._table[position].remove(current.item);
                if (this._table[position].isEmpty()) {
                    this._table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }
}

// id cell is not empty try next cell;
class HashTableWithLinearCollision extends HashTable{
    constructor(hashFunction) {
        super(hashFunction);
    }

    put(key, value) {
        const position = this._hashCode(key);
        if (this._table[position] === undefined) {
            this._table[position] = {key, value};
        } else {
            let index = position + 1;
            while (this._table[index] !== undefined) {
                index++;
            }
            this._table[index] = {key, value};
        }
    }

    get(key) {
        const position = this._hashCode(key);
        if (this._table[position] !== undefined) {
            if (this._table[position].key === key) {
                return this._table[position].value;
            } else {
                let index = position + 1;
                while (this._table[index] === undefined || this._table[index].key !== key) {
                    index = index + 1;
                }
                if (this._table[index].key === key) {
                    return this._table[index].value
                }
            }
        }
        return undefined;
    }

    remove(key) {
        const position = this._hashCode(key);
        if (this._table[position] !== undefined) {
            if (this._table[position].key === key) {
                this._table[position] = undefined;
            } else {
                let index = position + 1;
                while (this._table[index] === undefined || this._table[index].key !== key) {
                    index = index + 1;
                }
                if (this._table[index].key === key) {
                    this._table[index] = undefined;
                }
            }
        }
        return undefined;
    }

}

module.exports = {
    HashFunctions, HashTable, HashTableWithChainingCollision, HashTableWithLinearCollision
}
