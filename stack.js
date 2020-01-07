class Stack {
    constructor() {
        this._items = [];
    }

    // This adds a new item (or several items) to the top of
    // the stack.
    push(item) {
        this._items.push(item);
    };

    //This removes the top item from the stack. It also returns the removed
    // element.
    pop() {
        return this._items.pop();
    };

    // This returns the top element from the stack. The stack is not
    // modified (it does not remove the element; it only returns the element for
    // information purposes).
    peek() {
        return this._items[this._items.length - 1];
    };

    // This returns true if the stack does not contain any elements
    // and false if the size of the stack is bigger than 0.
    isEmpty() {
        return this._items.length === 0;
    };

    //This removes all the elements of the stack.
    clear() {
        this._items = [];
    };

    // This returns how many elements the stack contains. It is similar
    // to the length property of an array.
    size() {
        return this._items.length;
    };

    print() {
        console.log(this._items.toString(), this.min());
    }

}
function baseConverter(decNumber, base) {
    const stack = new Stack();
    let rem;
    let baseString = '';
    const digits = '0123456789ABCDEF';

    while (decNumber > 0) {
        rem = Math.floor(decNumber % base);
        stack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!stack.isEmpty()) {
        baseString = baseString + digits[stack.pop()];
    }

    return baseString;
}


module.exports = Stack;
