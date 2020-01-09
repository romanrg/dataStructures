function merge(left, right) {
    const result = [];
    let il = 0;
    let ir = 0;

    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    while (il < left.length) {
        result.push(left[il++])
    }

    while (ir < right.length) {
        result.push(right[ir++])
    }

    return result;
}
function mergeSortRec(array) {
    const length = array.length;

    if (length === 1) {
        return array;
    }

    const middle = Math.floor(length / 2);

    const left = array.slice(0, middle);
    const right = array.slice(middle, length);
    return merge(mergeSortRec(left), mergeSortRec(right));
}
function swapQuickSort(array, i, j) {
    const auxiliary = array[i];
    array[i] = array[j];
    array[j] = auxiliary;
}
function partition(array, left, right) {
    const PIVOT = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;

    while ( i <= j) {
        while (array[i] < PIVOT) {
            i++;
        }
        while (array[j] > PIVOT) {
            j--;
        }

        if (i <= j) {
            swapQuickSort(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}
function quick(array, left, right) {
    let index;
    if (array.length > 1) {
        index = partition(array, left, right);

        if (left < index - 1) {
            quick(array, left, index - 1);
        }

        if (index < right) {
            quick(array, index, right);
        }
    }
}

class ArrayList {
    constructor() {
        this._items = [];
    }
    insert(item) {
        this._items.push(item);
    }
    toString() {
        return this._items.join(' ');
    }
    swap(index1, index2) {
        const aux = this._items[index1];
        this._items[index1] = this._items[index2];
        this._items[index2] = aux;
    }

    // N ^ 2
    bubbleSorting(){
        const length = this._items.length;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length-1; j++) {
                this._items[j] > this._items[j + 1] ? this.swap(j, j+1) : '';
            }
        }
    };
    // still N ^ 2
    improvedBubbleSorting() {
        const length = this._items.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                this._items[j] > this._items[j + 1] ? this.swap(j, j + 1) : '';
            }
        }
    };
    // N ^ 2
    selectionSort() {
        const length = this._items.length;
        let indexMin;
        for (let i = 0; i < length - 1; i++) {
            indexMin = i;
            for (let j = i; j < length; j++) {
                if (this._items[indexMin] > this._items[j]) {
                    indexMin = j;
                }
            }

            if (i !== indexMin) {
                this.swap(i, indexMin);
            }
        }
    };

    // Best N, Average N^2;
    insertionSort() {
        const length = this._items.length;
        let j, temp;

        for (let i = 1; i < length; i++) {
            j = i;
            temp = this._items[i];

            while (j > 0 && this._items[j - 1] > temp) {
                this._items[j] = this._items[j - 1];
                j--;
            }
            this._items[j] = temp;
        }
    };

    // N log N
    mergeSort() {
        this._items = mergeSortRec(this._items);
    }

    //N log N, but Average > N log N;
    quickSort() {
        // select middle item of array called PIVOT

        //PARTITION
        // create to pointers — one to the very first
        // item of array, second to the very last;
            // move LEFT until find item > pivot; swap
            // move RIGHT until item < pivot; swap;
            // repeat until LEFT === RIGHT

        //repeat to subArrays

        quick(this._items, 0, this._items.length - 1);
    }

    // N
    sequentialSearching(item) {
        let result;
        this._items.forEach(
            (_item, index) => item === _item ? result = index : result = -1
        );
        return result;
    }

    // N log N
    binarySearch(item) {
        this.quickSort();
        let low = 0;
        let height = this._items.length - 1;
        let mid, element;

        while (low <= height) {
            mid = Math.floor((low + height) / 2);
            element = this._items[mid];
            if (element < item) {
                low = mid + 1;
            } else if (element > item) {
                height = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;

    }

}
