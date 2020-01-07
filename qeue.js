class Qeue {
    constructor() {
        this._items = [];
    }

    // This adds a new item (or several items) at the back
    // of the queue.
    enque(item) {
        this._items.push(item);
    }

    // This removes the first item from the queue (the item that is in
    // the front of the queue). It also returns the removed element.
    deque() {
        return this._items.shift();
    }

    // This returns the first element from the queue, the first one added,
    // and the first one that will be removed from the queue. The queue is not
    // modified (it does not remove the element; it only returns the element for
    // information purposes—very similar to the peek method from the Stack
    // class).
    front() {
        return this._items[0];
    }

    // This returns true if the queue does not contain any elements
    // and false if the queue is bigger than 0.
    isEmpty() {
        return this._items.length === 0;
    }

    // This returns how many elements the queue contains. It is similar
    // to the length property of the array.
    size() {
        return this._items.length;
    }

    print() {
        return this._items.toString();
    }
}


class HotPotatoGame {
    constructor(nameList, num) {
        this._qeue = new Qeue();
        this.list = nameList;
        this.num = num;
    }

    getWinner() {
        for (let i = 0, length = this.list.length; i < length; i++) {
            this._qeue.enque(this.list[i]);
        }

        let eliminated = '';

        while (this._qeue.size() > 1) {
            for (let i = 0; i < this.num; i++) {
                this._qeue.enque(this._qeue.deque());
            }
            eliminated = this._qeue.deque();
            console.log(eliminated + ' was eliminated from the game');
        }
        return this._qeue.deque();
    }
}


module.exports = Qeue;
