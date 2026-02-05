import LinkedList from "./linked-list";

export default class HashSet {
  loadFactor = 0.75;
  capacity = 16;
  buckets = new Array(this.capacity);
  _size = 0;

  hash = (key) => {
    if (typeof key !== "string") {
      throw new TypeError("Argument should be string");
    }

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  };

  /**
   * i) convert key to hashCode
   * ii) check if bucket exists with the hashCode
   * iii) if not, create new linked list and assign it to corresponding bucket
   *  and append key
   * iv) if bucket exists, check if the key exists in bucket
   * v) if so, return early
   *
   * @param {string} key
   */
  add = (key) => {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    if (!bucket) {
      this.buckets[hashCode] = new LinkedList();
      this.buckets[hashCode].append(key);
    } else {
      let current = bucket.first;
      while (current) {
        if (key === current.value) {
          return;
        }
        current = current.nextNode;
      }
      bucket.append(key);
    }
    this._size++;
    if (this.loadLevel() > this.loadFactor) {
      this.populate();
    }
  };

  has = (key) => {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    let current = bucket?.first;
    while (current) {
      if (current.value === key) {
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
      if (current.value === key) {
        bucket.removeAt(idx);
        if (bucket.size() === 0) {
          this.buckets[hashCode] = undefined;
        }
        this._size--;
        return true;
      }
      current = current.nextNode;
      idx++;
    }
    return false;
  };

  size = () => this._size;

  clear = () => {
    this.buckets = new Array(this.capacity);
    this._size = 0;
  };

  keys = () => {
    const keys = [];
    for (let bucket of this.buckets) {
      let current = bucket?.first;
      while (current) {
        keys.push(current.value);
        current = current.nextNode;
      }
    }
    return keys;
  };

  loadLevel = () => this.size() / this.capacity;

  populate = () => {
    const oldKeys = this.keys();
    this.capacity *= 2;
    this.clear();
    for (let key of oldKeys) {
      this.add(key);
    }
  };
}
