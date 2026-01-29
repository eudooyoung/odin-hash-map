import LinkedList from "./linked-list.js";

class HashSet {
  #loadFactor = 0;
  #capacity = 0;
  #buckets = [];
  #size = 0;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.#capacity = capacity;
    this.#loadFactor = loadFactor;
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
      this.add(entry[0]);
    }
  }

  add(key) {
    if (typeof key !== "string") {
      throw new TypeError("type of key is explicitly to be string");
    }

    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];
    // init bucket
    if (!bucket) {
      this.#buckets[hashCode] = new LinkedList();
      this.#buckets[hashCode].append(key);
    } else {
      for (let i = 0; i < bucket.size(); i++) {
        // if set contains the same key, return right away
        if (bucket.at(i) === key) {
          return;
        }
      }
      // if no same key found under same bucket, append a new node
      bucket.append(key);
    }

    this.#size++;
    if (this.currentLoader() > this.#loadFactor) {
      this.#populate();
    }
  }

  has(key) {
    if (typeof key !== "string") {
      throw new TypeError("type of key is explicitly to be string");
    }

    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];

    if (bucket) {
      for (let i = 0; i < bucket.size(); i++) {
        if (bucket.at(i) === key) {
          return true;
        }
      }
    }

    return false;
  }

  remove(key) {
    if (typeof key !== "string") {
      throw new TypeError("type of key is explicitly to be string");
    }

    const hashCode = this.#hash(key);
    const bucket = this.#buckets[hashCode];
    if (bucket) {
      for (let i = 0; i < bucket.size(); i++) {
        if (bucket.at(i) === key) {
          bucket.removeAt(i);
          this.#size--;
          return true;
        }
      }
    }

    return false;
  }

  size() {
    return this.#size;
  }

  clear() {
    this.#buckets = new Array(this.#capacity);
    this.#size = 0;
  }

  keys() {
    const keys = [];
    for (let bucket of this.#buckets) {
      if (bucket) {
        for (let i = 0; i < bucket.size(); i++) {
          keys.push(bucket.at(i));
        }
      }
    }
    return keys;
  }

  values() {
    return this.keys();
  }

  entries() {
    const entries = [];
    for (let bucket of this.#buckets) {
      if (bucket) {
        for (let i = 0; i < bucket.size(); i++) {
          entries.push([bucket.at(i)]);
        }
      }
    }
    return entries;
  }

  currentLoader() {
    return this.#size / this.#capacity;
  }
}

export default HashSet;
