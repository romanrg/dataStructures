class Node {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQeue {
    constructor() {
        this._items = [];
    }

    isEmpty() {
        return this._items.length === 0;
    }

    size() {
        return this._items.length;
    }

    enque(element, priority) {
        const qeueElement = new Node(element, priority);

        if (this.isEmpty()) {
            this._items.push(qeueElement);
        } else {
            let added = false;
            for (let i = 0, length = this.size(); i < length; i++) {
                if (qeueElement.priority < this._items[i].priority) {
                    this._items.splice(i, 0, qeueElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this._items.push(qeueElement);
            }
        }
    }

    print() {
        console.log(this._items);
    }

    front() {
        return this._items[0];
    }

    deque() {
        return this._items.shift();
    }
}

module.exports = PriorityQeue;

