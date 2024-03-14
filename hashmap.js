/**
 * Represents a HashMap data structure.
 */
class HashMap {
  constructor(capacity, loadFactor) {
    this._map = [];
    this._capacity = capacity;
    this._loadFactor = loadFactor;
  }

  /**
   * Calculates the hash code for the given key.
   *
   * @param {string} key - The key to calculate the hash code for.
   * @returns {number} The hash code for the key.
   */
  hash(key) {
    let hashCode = 0;      
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = ((primeNumber * hashCode) + key.charCodeAt(i)) % this._capacity;
    }

    return hashCode;
  }

  /**
   * Sets the value for the specified key in the hashmap.
   *
   * @param {any} key - The key to set.
   * @param {any} value - The value to set for the key.
   * @returns {void}
   */
  set(key, value) {
    const hashCode = this.hash(key);

    if (!this._map[hashCode]) {
      this._map[hashCode] = [[key, value]];
      return;
    }

    let filteredNode = this._map[hashCode].filter((node) => node[0] !== key);

    this._map[hashCode] = [...filteredNode, [key, value]]
  }

  /**
   * Retrieves the value associated with the specified key from the hashmap.
   * @param {any} key - The key to retrieve the value for.
   * @returns {any} - The value associated with the key, or null if the key is not found.
   */
  get(key) {
    const hashCode = this.hash(key);
    const list = this._map[hashCode];

    if (!list) return null;

    const filteredNode = list.find((node) => node[0] === key);

    if (!filteredNode) return null;

    return filteredNode[1];

  }
  
  /**
   * Checks if the hashmap contains a specific key.
   * @param {*} key - The key to check for.
   * @returns {boolean} - Returns true if the key is found, false otherwise.
   */
  has(key) {
    if (this._map.length === 0) return false;

    const hashCode = this.hash(key);
    const list = this._map[hashCode];
    if (!list) return false;
    if (list.length === 0) return false;
    
    let found = false;

    list.forEach((node) => {
      if (node[0] === key) found = true;
    })

    return found;
  }
  
  /**
   * Removes a key-value pair from the hashmap.
   * @param {any} key - The key of the pair to be removed.
   * @returns {boolean} - Returns true if the pair was successfully removed, false otherwise.
   */
  remove(key) {
    if (!this.has(key)) return false;

    const hashCode = this.hash(key);
    let filteredList = this._map[hashCode].filter((node) => node[0] !== key);

    this._map[hashCode] = filteredList;

    return true
  }
  
  /**
   * Returns the number of key-value pairs in the hashmap.
   *
   * @returns {number} The number of key-value pairs in the hashmap.
   */
  length() {
    if (this._map.length === 0) return 0;

    let count = 0;

    for (let i = 0; i < this._map.length; i++) {
      const list = this._map[i];
      if (list) count += list.length;      
    }

    return count;
  }
  
  /**
   * Clears the hashmap by resetting the internal map to an empty array.
   */
  clear() {
    this._map = [];
  }
  
  /**
   * Returns an array of all the keys in the hashmap.
   * 
   * @returns {Array} An array containing all the keys in the hashmap.
   */
  keys() {
    if (this.length() === 0) return [];

    let keys = [];

    for (let i = 0; i < this._map.length; i++) {
      const list = this._map[i];
      
      if (list) {
        for (let j = 0; j < list.length; j++) {
          keys.push(list[j][0]);
        }
      }
    }

    return keys;
  }
  
  /**
   * Returns an array of all the values in the hashmap.
   * 
   * @returns {Array} An array containing all the values in the hashmap.
   */
  values() {
    if (this.length() === 0) return [];

    let values = [];

    for (let i = 0; i < this._map.length; i++) {
      const list = this._map[i];
      
      if (list) {
        for (let j = 0; j < list.length; j++) {
          values.push(list[j][1]);
        }
      }
    }

    return values;
  }
  
  /**
   * Returns an array of all entries in the hashmap.
   * Each entry is represented as an array with two elements: [key, value].
   * If the hashmap is empty, an empty array is returned.
   *
   * @returns {Array} An array of all entries in the hashmap.
   */
  entries() {
    if (this.length() === 0) return [];

    let entries = [];

    for (let i = 0; i < this._map.length; i++) {
      const list = this._map[i];

      if (list) entries = [...entries, ...list]
    }

    return entries;
  }
}

module.exports = HashMap;
