/**
 * Represents a HashSet data structure.
 */
class HashSet {
  constructor(capacity, loadFactor) {
    this._map = [];
    this._capacity = capacity;
    this._loadFactor = loadFactor;
  }

  /**
   * Calculates the hash code for the given key.
   *
   * @param {string} key - The key to calculate the hash code for.
   * @returns {number} The hash code for the given key.
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
   * Adds a key to the hash set.
   *
   * @param {*} key - The key to be added.
   * @returns {void}
   */
  set(key) {
    const hashCode = this.hash(key);

    if (!this._map[hashCode]) {
      this._map[hashCode] = [key];
      return;
    }

    let filteredNode = this._map[hashCode].filter((node) => node !== key);

    this._map[hashCode] = [...filteredNode, key]
  }

  /**
   * Retrieves the value associated with the specified key.
   *
   * @param {*} key - The key to search for.
   * @returns {*} The value associated with the key, or null if the key is not found.
   */
  get(key) {
    const hashCode = this.hash(key);
    const list = this._map[hashCode];

    if (!list) return null;

    const filteredNode = list.find((node) => node === key);

    if (!filteredNode) return null;

    return filteredNode;

  }

  /**
   * Checks if the HashSet contains a specific key.
   *
   * @param {*} key - The key to check for in the HashSet.
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
      if (node === key) found = true;
    })

    return found;
  }

  /**
   * Removes the specified key from the hashset.
   * 
   * @param {any} key - The key to be removed.
   * @returns {boolean} - Returns true if the key was successfully removed, false otherwise.
   */
  remove(key) {
    if (!this.has(key)) return false;

    const hashCode = this.hash(key);
    let filteredList = this._map[hashCode].filter((node) => node !== key);

    this._map[hashCode] = filteredList;

    return true
  }

  /**
   * Returns the number of elements in the HashSet.
   *
   * @returns {number} The number of elements in the HashSet.
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
   * Clears the hashset by removing all elements.
   */
  clear() {
    this._map = [];
  }

  /**
   * Returns an array of all entries in the hashset.
   * Each entry is represented as an array [key, value].
   *
   * @returns {Array} An array of all entries in the hashset.
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

module.exports = HashSet;