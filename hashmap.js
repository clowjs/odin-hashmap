class HashMap {
  constructor(capacity, loadFactor) {
    this._map = [];
    this._capacity = capacity;
    this._loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;      
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = ((primeNumber * hashCode) + key.charCodeAt(i)) % this._capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (!this._map[hashCode]) {
      this._map[hashCode] = [[key, value]];
      return;
    }

    let filteredNode = this._map[hashCode].filter((node) => node[0] !== key);

    this._map[hashCode] = [...filteredNode, [key, value]]
  }

  get(key) {
    const hashCode = this.hash(key);
    const list = this._map[hashCode];

    if (!list) return null;

    const filteredNode = list.find((node) => node[0] === key);

    if (!filteredNode) return null;

    return filteredNode[1];

  }
  
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
  
  remove(key) {
    if (!this.has(key)) return false;

    const hashCode = this.hash(key);
    let filteredList = this._map[hashCode].filter((node) => node[0] !== key);

    this._map[hashCode] = filteredList;

    return true
  }
  
  length() {
    if (this._map.length === 0) return 0;

    let count = 0;

    for (let i = 0; i < this._map.length; i++) {
      const list = this._map[i];
      if (list) count += list.length;      
    }

    return count;
  }
  
  clear() {
    this._map = [];
  }
  
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
