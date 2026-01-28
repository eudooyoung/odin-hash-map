

class HashMap {
  #loadFactor = 0;
  #capacity = 0;
  #buckets = [];
  #length = 0;

  constructor() {
    this.#loadFactor = 0.75;
    this.#capacity = 16;
    this.#buckets = new Array(this.#capacity).fill(null);
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    this.#buckets[hashCode] = { key, value };

    if (++this.#length > this.#capacity * this.#loadFactor) {
      const newBuckets = this.#buckets.concat(
        new Array(this.#capacity).fill(null),
      );
      this.#capacity *= 2;
    }
  }

  get(key) {
    const hashCode = this.#hash(key);
    if (hashCode < 0 || hashCode >= this.#length) {
      throw new Error("Trying to access index out of bounds");
    }
    return this.#buckets[hashCode].value;
  }

  has(key) {
    const hashCode = this.#hash(key);
    return this.#buckets[hashCode] ? true : false;
  }

  remove(key) {
    const hashCode = this.#hash(key);
    if (this.#buckets[hashCode]) {
      this.#buckets[hashCode] = null;
      this.#length--;
      return true;
    }

    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#length = 0;
  }

  keys() {
    const keys = new Array(this.#length);
    let i = 0;
    for (let bucket of this.#buckets) {
      if (bucket) {
        keys[i++] = bucket.key;
      }
    }

    return keys;
  }

  values() {
    const values = new Array(this.#length);
    let i = 0;
    for (let bucket of this.#buckets) {
      if (bucket) {
        values[i++] = bucket.value;
      }
    }

    return values;
  }

  entries() {
    const entries = new Array(this.#length);
    let i = 0;
    for (let bucket of this.#buckets) {
      if (bucket) {
        const entry = [bucket.key, bucket.value];
        entries[i++] = entry;
      }
    }

    return entries;
  }
}

const map = new HashMap();
map.set("Rama", 1);
map.set("Sita", 2);
console.log(map.entries());
