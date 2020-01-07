class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    insert(position, element) {
        if (position >= 0 && position <= this.length) {
            const node = new Node(element);

            let current = this._head;
            let previous;
            let index = 0;

            if (position === 0) {
                if(!this._head) {
                    this._head = node;
                    this._tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    this._head = node;
                }
            } else if (position === this.length) {
                current = this._tail;
                current.next = node;
                node.prev = current;
                this._tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;

                current.prev = node;
                node.prev = previous;
            }

            this.length++;
            return true;
        } else {
            return false;
        }
    }

    removeAt(position) {
        if (position > -1 && position < this.length) {
            let current = this._head;
            let previous;
            let index = 0;

            if (position === 0) {
                this._head = current.next;
                if(this.length === 1) {
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }
            } else if (position === this.length - 1) {
                current = this._tail;
                this._tail = current.prev;
                this._tail.next = null;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
                current.next.prev = previous;
            }

            this.length--;
            return current.element;

        } else {
            return null;
        }
    }

    push(element) {
        const node = new Node(element);
        if(this._head === null) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
    }

    indexOf(element) {
        let current = this._head;
        let index = 0;
        while (current != null) {
            if (current.element === element) {
                return index;
            }
            index++;
            current = current.next
        }

        return -1;
    }

    getTail() {
        return this._tail;
    }

    getHead() {
        return this._head;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    inverse() {
        let swap = (node) => {
            let holder = node.next;
            node.next = node.prev;
            node.prev = holder;
        };
        let current = this._head;
        let index = 0;
        while (index < this.length) {
            let holder = current.next;
            swap(current);
            if (current.prev === null) {
                this._head = current;
            }
            if (current.next === null) {
                this._tail = current;
            }
            current = holder;
            index++;
        }
    }

    toString() {
        let string = '';
        let current = this._head;
        while (current) {
            string = `${string} ${current.element}`
            current = current.next;
        }

        return string.trim();
    }

    print() {
        console.log(this.toString());
    }
}

module.exports = DoubleLinkedList;
