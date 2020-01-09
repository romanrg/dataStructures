class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

const insertNode = (node, newNode) => {
    if (newNode.key < node.key) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            insertNode(node.left, newNode);
        }
    } else {
        if (node.right === null) {
            node.right = newNode
        } else {
            insertNode(node.right, newNode);
        }
    }
};
const inOrderTraverseNode = (node, cb) => {
    if (node !== null) {
        inOrderTraverseNode(node.left, cb);
        cb(node.key);
        inOrderTraverseNode(node.right, cb);
    }
};
const printNode = (key) => console.log(key);
const preOrderTraverseNode = (node, cb) => {
    if (node !== null) {
        cb(node.key);
        preOrderTraverseNode(node.left, cb);
        preOrderTraverseNode(node.right, cb);
    }
};
const postOrderTraverseNode = (node, cb) => {
    if (node !== null) {
        postOrderTraverseNode(node.left, cb);
        postOrderTraverseNode(node.right, cb);
        cb(node.key);
    }
};
const minNode = (node) => {
    if (node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node.key;
    }
    return null;
};
const maxNode = (node) => {
    if (node) {
        while (node && node.right !== null) {
            node = node.right;
        }
        return node.key;
    }
    return null;
};
const searchNode = (node, key) => {
    if (node === null) {
        return false
    }
    if (key < node.key) {
        return searchNode(node.left, key);
    } else if (key > node.key) {
        return searchNode(node.right, key);
    } else {
        return true;
    }
};
const findMinNode = (node) => {
    if (node) {
        while (node && node.left !== null) {
            node = node.left;
        }
        return node;
    }
    return null;
};
const removeNode = (node, key) => {
    if (node === null) {
        return false
    }

    if (key < node.key) {
        node.left = removeNode(node.left, key);
        return node;
    } else if (key > node.key) {
        node.right = removeNode(node.right, key);
        return node;
    } else {

        // a leaf node;
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }

        //only one child
        if (node.left === null) {
            node = node.right;
            return node;
        } else if (node.right === null) {
            node = node.left;
            return node;
        }

        //a node with 2 children

        let aux = findMinNode(node.right);
        node.key = aux.key;
        node.right = removeNode(node.right, aux.key);
        return node;

    }
};
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    // This inserts a new key in the tree
    insert(key) {
        const newNode = new Node(key);
        if (this.root === null) {
            this.root = newNode;
        } else {
            insertNode(this.root, newNode);
        }
    }
    //  This searches for the key in the tree and returns true if it
    // exists and returns false if the node does not exist
    search(key) {
        return searchNode(this.root, key);
    }
    // This visits all nodes of the tree using in-order traverse
    inOrderTraverse(cb) {
        inOrderTraverseNode(this.root, cb);
    }
    // This visits all nodes of the tree using pre-order traverse
    preOrderTraverse(cb) {
        preOrderTraverseNode(this.root, cb)
    }
    // This visits all nodes of the tree using post-order traverse
    postOrderTraverse(cb) {
        postOrderTraverseNode(this.root, cb);
    }
    // This returns the minimum value/key in the tree
    min() {
        return minNode(this.root);
    }
    // This returns the maximum value/key in the tree
    max() {
        return maxNode(this.root);
    }
    // This removes the key from the tree
    remove(key) {
        this.root = removeNode(this.root, key);
    }
}

