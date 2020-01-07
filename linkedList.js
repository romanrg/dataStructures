class Node {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
    }

    //  This adds a new item to the end of the list
    append(element) {
        const node = new Node(element);
        let current;

        if (this._head === null) {
            this._head = node;
        } else {
            current = this._head;

            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }

        this.length++;
    }

    //  This inserts a new item at a specified
    // position in the list
    insert(position, element) {
        if (position >= 0 && position <= this.length) {
            const node = new Node(element);
            let current = this._head;
            let previous;
            let index = 0;

            if (position === 0) {
                node.next = current;
                this._head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;
            return true;
        } else {
            return false;
        }
    }

    // This returns the index of the element in the list. If the
    // element is not in the list, it returns -1
    removeAt(position) {
        if (position > -1 && position < this.length) {
            let current = this._head;
            let previous;
            let index = 0;

            if (position === 0) {
                this._head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
            }
            this.length--;

            return current.item;
        } else {
            return null;
        }
    }

    // This removes an item from the list
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    // This returns the index of the element in the list. If the
    // element is not in the list, it returns -1
    indexOf(element) {
        let current = this._head;
        let index = -1;

        while (current) {
            if (element === current.item) {
                index++;
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    }

    // This returns true if the linked list does not contain any elements
    // and false if the size of the linked list is bigger than 0.
    isEmpty() {
        return this.length === 0;
    }

    // This returns how many elements the linked list contains. It is similar
    // to the length property of the array.
    size() {
        return this.length;
    }

    // As the list uses a Node class as an item, we need to overwrite
    // the default toString method inherited from the JavaScript object to output
    // only the element values.
    toString() {
        let current = this._head;
        let string = '';
        while (current) {
            string = `${string} ${JSON.stringify(current.item)}`;
            current = current.next;
        }
        return string.trim();
    }

    getHead() {
        return this._head;
    }

}

module.exports = LinkedList;
