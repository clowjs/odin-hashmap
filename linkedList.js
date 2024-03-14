/**
 * Represents a linked list data structure.
 */
class LinkedList {
  constructor() {
    this._head = null;
  }

  /**
   * Appends a new node with the given value to the linked list.
   *
   * @param {*} value - The value to be added to the linked list.
   * @returns {void}
   */
  append(value) {
    const newNode = new Node();
    newNode.value = value;

    if (!this.head()) {
      this._head = newNode;
      return;
    }

    this.tail().nextNode = newNode;
  }

  /**
   * Adds a new node with the given value at the beginning of the linked list.
   * @param {*} value - The value to be added to the linked list.
   */
  prepend(value) {
    const newNode = new Node();
    newNode.value = value;
    newNode.nextNode = this.head();
    this._head = newNode;
  }

  /**
   * Returns the number of elements in the linked list.
   *
   * @returns {number} The size of the linked list.
   */
  size() {
    if (!this.head()) return 0;

    let currentNode = this.head();

    if (!currentNode.nextNode) return 1;

    let total = 1;

    while (currentNode.nextNode) {
      total += 1;
      currentNode = currentNode.nextNode;
    }

    return total;
  }

  /**
   * Returns the head of the linked list.
   * @returns {Node} The head of the linked list.
   */
  head() { return this._head }

  /**
   * Returns the last node of the linked list.
   * @returns {Node|null} The last node of the linked list, or null if the list is empty.
   */
  tail() {
    if (!this.head()) return null
    if (!this.head().nextNode) return this.head();

    let currentNode = this.head();

    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }

    return currentNode;
  }

  /**
   * Retrieves the node at the specified index in the linked list.
   * 
   * @param {number} index - The index of the node to retrieve.
   * @returns {Node|null} - The node at the specified index, or null if the index is out of range.
   */
  at(index) {
    if (!this.head()) return null;
    if (index === 0) return this.head();

    let currentNode = this.head();

    for (let i = 1; i <= index; i++) {
      if (!currentNode.nextNode) return null;

      currentNode = currentNode.nextNode;
    }

    return currentNode;
  }

  /**
   * Removes and returns the last node from the linked list.
   * @returns {Node} The last node that was removed from the linked list.
   */
  pop() {
    const penultimateIndex = this.size() - 2;
    const penultimateNode = this.at(penultimateIndex);
    const lastNode = this.tail();
    penultimateNode.nextNode = null;

    return lastNode;
  }

  /**
   * Checks if the linked list contains a specific value.
   *
   * @param {*} value - The value to search for in the linked list.
   * @returns {boolean} - Returns true if the value is found, false otherwise.
   */
  contains(value) {
    for (let i = 0; i < this.size(); i++) {
      const node = this.at(i);
      if (node.value === value) return true;
    }

    return false;
  }

  /**
   * Finds the index of the first occurrence of a given value in the linked list.
   * @param {*} value - The value to search for.
   * @returns {number|null} - The index of the found value, or null if the value is not found.
   */
  find(value) {
    for (let i = 0; i < this.size(); i++) {
      const node = this.at(i);
      if (node.value === value) return i;
    }

    return null;
  }

  /**
   * Returns a string representation of the linked list.
   * @returns {string} The string representation of the linked list.
   */
  toString() {
    if (this.size() < 1) return null;

    let string = '';

    for (let i = 0; i < this.size(); i++) {
      const newString = i === 0
        ? `( ${this.at(i).value} )`
        : ` -> ( ${this.at(i).value} )`;
      
      string = string + newString;
    }

    string = string + ' -> null';
    
    return string;
  }

  /**
   * Inserts a new node with the given value at the specified index in the linked list.
   * @param {*} value - The value to be inserted.
   * @param {number} index - The index at which the new node should be inserted.
   * @returns {void}
   */
  insertAt(value, index) {
    const newNode = new Node();
    newNode.value = value;
    
    const nodeAtIndex = this.at(index);
    newNode.nextNode = nodeAtIndex;

    if (index === 0) {
      this._head = newNode;
      return;
    } 
    
    const nodeBeforeIndex = this.at(index - 1)
    nodeBeforeIndex.nextNode = newNode;

    return;    
  }

  /**
   * Removes the element at the specified index from the linked list.
   * @param {number} index - The index of the element to be removed.
   * @returns {void}
   */
  removeAt(index) {
    if (index > this.size() - 1) return;
    if (index < 0) return;

    const nodeAtIndex = this.at(index);

    if (index === 0) {
      if (!this.at(index + 1)) {
        this._head = null;
        return;
      }

      this._head = this.at(index + 1);
      return;
    }

    if (!nodeAtIndex.nextNode) {
      this.at(index - 1).nextNode = null;
      return;
    }

    this.at(index - 1).nextNode = this.at(index + 1);
    return;
  }
}

/**
 * Represents a node in a linked list.
 * @class
 */
class Node {
  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

module.exports = LinkedList;