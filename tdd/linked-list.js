import Node from "./node.js";

class LinkedList {
  length = 0;
  first = null;
  last = null;

  append = (value) => {
    const node = new Node(value);
    if (this.length === 0) {
      this.first = this.last = node;
    } else {
      this.last.nextNode = node;
      this.last = node;
    }

    this.length++;
  };

  prepend = (value) => {
    const node = new Node(value);
    if (this.length === 0) {
      this.first = this.last = node;
    } else {
      node.nextNode = this.first;
      this.first = node;
    }

    this.length++;
  };

  size = () => this.length;

  head = () => {
    if (!this.first) {
      return;
    }

    return this.first.value;
  };

  tail = () => {
    if (!this.last) {
      return;
    }

    return this.last.value;
  };

  at = (index) => {
    if (index < 0 || index >= this.size()) {
      return;
    }

    let current = this.first;
    while (index > 0) {
      current = current.nextNode;
      index--;
    }
    return current.value;
  };

  pop = () => {
    if (this.size() === 0) {
      return;
    }
    const top = this.head();
    this.first = this.first.nextNode;
    if (--this.length === 0) {
      this.first = this.last = null;
    }
    return top;
  };

  contains = (value) => {
    let current = this.first;
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  };

  findIndex = (value) => {
    let current = this.first;
    let idx = 0;
    while (current) {
      if (current.value === value) {
        return idx;
      }
      current = current.nextNode;
      idx++;
    }
    return -1;
  };

  toString = () => {
    if (this.length === 0) {
      return "";
    }
    let current = this.first;
    const parts = [];
    while (current) {
      const part = `( ${current.value} ) -> `;
      parts.push(part);
      current = current.nextNode;
    }
    let str = parts.join("") + "null";
    return str;
  };

  insertAt = (index, ...values) => {
    if (index < 0 || index > this.size()) {
      throw new RangeError(
        "Index should be at least 0 and at most the size of list",
      );
    }

    if (values.length === 0) {
      return;
    }

    const subList = new LinkedList();
    values.forEach(subList.append);

    switch (index) {
      case 0: {
        if (this.size() === 0) {
          this.first = subList.first;
          this.last = subList.last;
        } else {
          const currentFirst = this.first;
          this.first = subList.first;
          subList.last.nextNode = currentFirst;
        }
        break;
      }
      case this.size(): {
        this.last.nextNode = subList.first;
        this.last = subList.last;
        break;
      }
      default: {
        let previous = this.first;
        for (let i = 0; i < index - 1; i++) {
          previous = previous.nextNode;
        }
        const target = previous.nextNode;
        previous.nextNode = subList.first;
        subList.last.nextNode = target;
      }
    }

    this.length += subList.size();
  };

  removeAt = (index) => {
    if (index < 0 || index >= this.size()) {
      throw new RangeError(
        "Index should be at least 0 and smaller than size of list",
      );
    }

    switch (index) {
      case 0: {
        this.first = this.first.nextNode;
        break;
      }
      case this.size() - 1: {
        let previous = this.first;
        for (let i = 0; i < index - 1; i++) {
          previous = previous.nextNode;
        }
        previous.nextNode = null;
        this.last = previous;
        break;
      }
      default: {
        let previous = this.first;
        for (let i = 0; i < index - 1; i++) {
          previous = previous.nextNode;
        }
        const target = previous.nextNode;
        const next = target.nextNode;
        previous.nextNode = next;
      }
    }

    if (--this.length === 0) {
      this.first = this.last = null;
    }
  };
}

export default LinkedList;
