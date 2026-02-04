import Node from "./node.js";

class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  append(value) {
    const newNode = new Node(value);

    if (this.#size === 0) {
      this.#head = this.#tail = newNode;
    } else {
      this.#tail.setNextNode(newNode);
      this.#tail = newNode;
    }

    this.#size++;
  }

  prepend(value) {
    const newNode = new Node(value);

    if (this.#size === 0) {
      this.#head = this.#tail = newNode;
    } else {
      newNode.setNextNode(this.#head);
      this.#head = newNode;
    }

    this.#size++;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#head?.getValue();
  }

  tail() {
    return this.#tail?.getValue();
  }

  at(index) {
    if (index < 0 || index >= this.#size) {
      return;
    }

    let currentNode = this.#head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.getNextNode();
    }
    return currentNode.getValue();
  }

  pop() {
    if (this.#size === 0) {
      return;
    }

    const value = this.#head.getValue();
    this.#head = this.#head.getNextNode();
    if (--this.#size === 0) {
      this.#head = this.#tail = null;
    }
    return value;
  }

  contains(value) {
    let currentNode = this.#head;
    while (currentNode) {
      if (currentNode.getValue() === value) {
        return true;
      }
      currentNode = currentNode.getNextNode();
    }
    return false;
  }

  findIndex(value) {
    let currentNode = this.#head;
    let index = 0;
    while (currentNode) {
      if (currentNode.getValue() === value) {
        return index;
      }
      currentNode = currentNode.getNextNode();
      index++;
    }

    return -1;
  }

  toString() {
    let str = "";
    if (this.#size === 0) {
      return str;
    }

    let currentNode = this.#head;
    str = `( ${currentNode.getValue()} )`;
    while (currentNode) {
      let nextNode = currentNode.getNextNode();
      const strToConcat = nextNode ? `( ${nextNode.getValue()} )` : nextNode;
      str = str.concat(" -> ", strToConcat);
      currentNode = nextNode;
    }
    return str;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.#size) {
      throw new RangeError(`Index ${index} is out of bound`);
    }

    let first = null;
    let last = null;
    for (let value of values) {
      const node = new Node(value);
      if (!first) {
        first = last = node;
      } else {
        last.setNextNode(node);
        last = node;
      }
    }

    switch (index) {
      case 0:
        last.setNextNode(this.#head);
        this.#head = first;
        break;

      case this.#size:
        this.#tail.setNextNode(first);
        this.#tail = last;
        break;

      default:
        let currentNode = this.#head;
        for (let i = index - 1; i > 0; i--) {
          currentNode = currentNode.getNextNode();
        }
        const nextNode = currentNode.getNextNode();
        currentNode.setNextNode(first);
        last.setNextNode(nextNode);
    }

    this.#size += values.length;
  }

  removeAt(index) {
    if (index < 0 || index >= this.#size) {
      throw new RangeError(`Index ${index} is out of bound`);
    }

    let currentNode;

    switch (index) {
      case 0:
        this.#head = this.#head.getNextNode();
        if (this.#size === 1) {
          this.#tail = null;
        }
        break;

      case this.#size - 1:
        currentNode = this.#head;
        for (let i = index - 1; i > 0; i--) {
          currentNode = currentNode.getNextNode();
        }
        currentNode.setNextNode(null);
        this.#tail = currentNode;
        break;

      default:
        currentNode = this.#head;
        for (let i = index - 1; i > 0; i--) {
          currentNode = currentNode.getNextNode();
        }
        const nextNode = currentNode.getNextNode().getNextNode();
        currentNode.setNextNode(nextNode);
    }

    this.#size--;
  }
}

export default LinkedList;
