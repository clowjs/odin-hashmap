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
  has(key) {}

  // remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  remove(key) {}

  // length() returns the number of stored keys in the hash map.
  length() {}

  // clear() removes all entries in the hash map.
  clear() {}

  // keys() returns an array containing all the keys inside the hash map.
  keys() {}

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

console.log(map);
console.log(map._map[13])

map.set('Sergio', 40);
map.set('Jose', 30)
console.log(map.get('Felipe'));

module.exports = HashMap;