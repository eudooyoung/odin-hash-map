import LinkedList from "./linked-list.js";
import Node from "./node.js";

class HashMap {
  #loadFactor = 0;
  #capacity = 0;
  #buckets = [];
  #length = 0;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#buckets = new Array(this.#capacity);
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  #populate() {
    const entries = this.entries();
    this.#capacity *= 2;
    this.clear();
    for (let entry of entries) {
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * if a bucket(linked list) exists for a given key,
   *  if there exists a node of key is same as given,
   *    remove the node and insert a new node with given key and value.
   *  if not,
   * @param {string} key given key
   * @param {object} value given value
   */
  set(key, value) {
    if (typeof key !== "string") {
      throw new TypeError("type of key is explicitly to be string");
    }

    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];
    // if bucket exists
    if (bucket) {
      let i = 0;
      while (i < bucket.size()) {
        // if key matches
        if (bucket.at(i).key === key) {
          // update
          bucket.removeAt(i);
          bucket.append({ key, value });
          // return without modifying length
          return;
        }
        i++;
      }
      // bucket exists, but key doesn't match
      bucket.append({ key, value });
    }
    // if bucket doesn't exist
    else {
      // init bucket
      this.#buckets[hashCode] = new LinkedList();
      this.#buckets[hashCode].append({ key, value });
    }

    this.#length++;

    // populate
    if (this.currentLoadLevel() > this.#loadFactor) {
      this.#populate();
    }
  }

  get(key) {
    if (typeof key !== "string") {
      throw new TypeError("type of key is explicitly to be string");
    }

    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];

    if (bucket) {
      let i = 0;
      while (i < bucket.size()) {
        // handle duplicated hashCode with different keys
        if (bucket.at(i).key === key) {
          return bucket.at(i).value;
        }
        i++;
      }
    }
    return null;
  }

  has(key) {
    const hashCode = this.#hash(key);
    return this.#buckets[hashCode] ? true : false;
  }

  remove(key) {
    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];
    if (bucket) {
      let i = 0;
      while (i < bucket.size()) {
        if (bucket.at(i).key === key) {
          bucket.removeAt(i);
          this.#length--;
          return true;
        }
        i++;
      }
    }
    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#buckets = new Array(this.#capacity);
    this.#length = 0;
  }

  keys() {
    const keys = [];
    for (let bucket of this.#buckets) {
      if (bucket) {
        for (let i = 0; i < bucket.size(); i++) {
          keys.push(bucket.at(i).key);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let bucket of this.#buckets) {
      if (bucket) {
        for (let i = 0; i < bucket.size(); i++) {
          values.push(bucket.at(i).value);
        }
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let bucket of this.#buckets) {
      if (bucket) {
        for (let i = 0; i < bucket.size(); i++) {
          entries.push([bucket.at(i).key, bucket.at(i).value]);
        }
      }
    }
    return entries;
  }

  currentLoadLevel() {
    return this.#length / this.#capacity;
  }
}

export default HashMap;
