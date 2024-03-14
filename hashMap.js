class HashMap {
  constructor(capacity, loadFactor) {
    this._map = [];
    this._capacity = capacity;
    this._loadFactor = loadFactor;
  }

  // if (index < 0 || index >= buckets.length) {
  //   throw new Error("Trying to access index out of bound");
  // }

  // hash(key) takes a key and produces a hash code with it.
  hash(key) {
    let hashCode = 0;      
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = ((primeNumber * hashCode) + key.charCodeAt(i)) % this._capacity;
    }

    return hashCode;
  }

  // set(key, value) takes two arguments, the first is a key and the second is a value that is assigned to this key.
  // If a key already exists, then the old value is overwritten or we can say that we update the key’s value
  set(key, value) {
    const hashCode = this.hash(key);

    if (!this._map[hashCode]) {
      this._map[hashCode] = [[key, value]];
      return;
    }

    let filteredNode = this._map[hashCode].filter((node) => node[0] !== key);

    this._map[hashCode] = [...filteredNode, [key, value]]
  }

  // get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
  get(key) {
    const hashCode = this.hash(key);
    const list = this._map[hashCode];

    if (!list) return null;

    const filteredNode = list.find((node) => node[0] === key);

    if (!filteredNode) return null;

    return filteredNode[1];

  }

  // has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
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

  // remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  remove(key) {
    if (!this.has(key)) return false;

    const hashCode = this.hash(key);
    let filteredList = this._map[hashCode].filter((node) => node[0] !== key);

    this._map[hashCode] = filteredList;

    return true
  }

  // length() returns the number of stored keys in the hash map.
  length() {
    if (this._map.length === 0) return 0;

    let count = 0;

    for (let i = 0; i < this._map.length; i++) {
      const list = this._map[i];
      if (list) count += list.length;      
    }

    return count;
  }

  // clear() removes all entries in the hash map.
  clear() {
    this._map = [];
  }

  // keys() returns an array containing all the keys inside the hash map.
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

  // values() returns an array containing all the values.
  values() {}

  // entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {}

  // Extra Credit
  // Create a class HashSet that behaves the same as a HashMap but only contains keys with no values.
}

const map = new HashMap(16, 0.75);
console.log(map);

map.set('Sergio', 35);
map.set('Mario', 15);
map.set('Nathan', 25);
map.set('Gabrielle', 45);
map.set('Rose', 55);

console.log(map.length());
console.log(map.keys());

module.exports = HashMap;