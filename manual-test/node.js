class Node {
  #value = null;
  #nextNode = null;

  constructor(value, nextNode = null) {
    this.#value = value;
    this.#nextNode = nextNode;
  }

  setValue(value) {
    this.#value = value;
  }

  getValue() {
    return this.#value;
  }

  setNextNode(node) {
    this.#nextNode = node;
  }

  getNextNode() {
    return this.#nextNode;
  }
}

export default Node;
