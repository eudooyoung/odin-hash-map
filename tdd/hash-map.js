import LinkedList from "./linked-list.js";

export default class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  buckets = new Array(this.capacity);

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

  set = (key, value) => {
    const hashCode = this.hash(key);
    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = new LinkedList();
    }
    this.buckets[hashCode] = value;
  };

  get = (key) => {
    const hashCode = this.hash(key);
    return this.buckets[hashCode] ?? null;
  };
}
