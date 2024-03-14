class HashSet {
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

  set(key) {
    const hashCode = this.hash(key);

    if (!this._map[hashCode]) {
      this._map[hashCode] = [key];
      return;
    }

    let filteredNode = this._map[hashCode].filter((node) => node !== key);

    this._map[hashCode] = [...filteredNode, key]
  }

  get(key) {
    const hashCode = this.hash(key);
    const list = this._map[hashCode];

    if (!list) return null;

    const filteredNode = list.find((node) => node === key);

    if (!filteredNode) return null;

    return filteredNode;

  }

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

  remove(key) {
    if (!this.has(key)) return false;

    const hashCode = this.hash(key);
    let filteredList = this._map[hashCode].filter((node) => node !== key);

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