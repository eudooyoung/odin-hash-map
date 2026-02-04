export default class Node {
  value;
  nextNode = null;

  constructor(value = null) {
    this.value = value;
  }
}
