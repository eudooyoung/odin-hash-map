import LinkedList from "./linked-list.js";

export default class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  buckets = new Array(this.capacity);
  _length = 0;

  hash = (key) => {
    if (typeof key !== "string") {
      throw new TypeError("key should be string");
    }

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  };

  /**
   * i) get hashcode with key
   * ii) If the bucket for the hashcode isn't initiated yet, initiate it and apend
   * key-value pair as an object, return earily.
   * iii) If the bucket has been initiated, check if the bucket contains a pair
   * with the same key
   * iv) If so, update the pair with new value
   * v) If not, append new pair with given key and value to the bucket
   *
   * @param {string} key
   * @param {object} value
   */
  set = (key, value) => {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    // init bucket
    if (!bucket) {
      this.buckets[hashCode] = new LinkedList();
      this.buckets[hashCode].append({ key, value });
    }
    // collision handling
    else {
      let current = bucket.first;
      while (current) {
        const pair = current.value;
        // update existing pair
        if (pair.key === key) {
          pair.value = value;
          return;
        }
        current = current.nextNode;
      }
      // append new pair
      bucket.append({ key, value });
    }
    this._length++;
    // populate
    if (this.loadLevel() > this.loadFactor) {
      this.populate();
    }
  };

  get = (key) => {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    let current = bucket?.first;
    while (current) {
      const pair = current.value;
      if (pair.key === key) {
        return pair.value;
      }
      current = current.nextNode;
    }
    return null;
  };

  has = (key) => {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    let current = bucket?.first;
    while (current) {
      const pair = current.value;
      if (pair.key === key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  };

  remove = (key) => {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    let current = bucket?.first;
    let idx = 0;
    while (current) {
      const pair = current.value;
      if (pair.key === key) {
        bucket.removeAt(idx);
        this._length--;
        if (bucket.size() === 0) {
          this.buckets[hashCode] = undefined;
        }
        return true;
      }
      current = current.nextNode;
      idx++;
    }
    return false;
  };

  length = () => this._length;

  clear = () => {
    this.buckets = new Array(this.capacity);
    this._length = 0;
  };

  keys = () => {
    const keys = [];
    for (let bucket of this.buckets) {
      let current = bucket?.first;
      while (current) {
        const pair = current.value;
        keys.push(pair.key);
        current = current.nextNode;
      }
    }
    return keys;
  };

  values = () => {
    const values = [];
    for (let bucket of this.buckets) {
      let current = bucket?.first;
      while (current) {
        const pair = current.value;
        values.push(pair.value);
        current = current.nextNode;
      }
    }
    return values;
  };

  entries = () => {
    const entries = [];
    for (let bucket of this.buckets) {
      let current = bucket?.first;
      while (current) {
        const pair = current.value;
        entries.push([pair.key, pair.value]);
        current = current.nextNode;
      }
    }
    return entries;
  };

  loadLevel = () => this._length / this.capacity;

  populate = () => {
    const oldEntries = this.entries();
    this.capacity *= 2;
    this.clear();
    for (let entry of oldEntries) {
      this.set(entry[0], entry[1]);
    }
  };
}
