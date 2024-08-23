/**
 * @import { DoublyLinkedListType, DoublyLinkedListNode} from '../types/data_type'
 */


/**
 * @class DoublyLinkedList
 * @implements {DoublyLinkedListType<T>}
 * @template {object} T
 */
export class DoublyLinkedList {
  length = 0;

  /**
   * @type {DoublyLinkedListNode<T>} head 头节点
   */
  head = null;

  /**
   * @type {DoublyLinkedListNode<T>} tail 尾节点
   */
  tail = null;

  /**
   * @description 双向链表中的节点
   * @implements {DoublyLinkedListNode<T>}
   * @template {object} T
   */
  Node = class EntryNode {
    val = null;
    prev = null; // 上一个节点
    next = null; // 下一个节点
    constructor(element) {
      this.val = element;
    }
  };

  constructor(...args) {
    for (let arg of args) {
      this.append(arg);
    }
  }

  /**
   * @param {T} element
   */
  append = (element) => {
    const node = new this.Node(element);
    // 既是头节点, 也是尾节点, prev和tail都是null
    if (this.tail === null && this.head === null) {
      this.tail = node;
      this.head = node;
    } else {
      // 新节点的上一个节点 是 原尾节点
      node.prev = this.tail;
      // 原尾节点 的下一个节点 是新节点
      this.tail.next = node;
      this.tail = node;
    }
    this.length = this.length + 1;
    return this;
  };

  /**
   * @param {number} position
   * @param {T} element
   * @returns
   */
  insert = (position, element) => {
    if (position < 0 || position > this.length) return;
    const node = new this.Node(element);
    if (position === 0) {
      if (this.length === 0) {
        this.tail = node;
        this.head = node;
      } else {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      }
    } else if (position === this.length) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      let target = position > this.length / 2 ? this.tail : this.head;
      if (position > this.length / 2) {
        let index = this.length - 1;
        while (index-- > position) {
          target = target.prev;
        }
      } else {
        let index = 0;
        while (index++ < position) {
          target = target.next;
        }
      }
      // 上一个节点
      target.prev.next = node;
      node.prev = target.prev;
      // 当前节点
      target.prev = node;
      node.next = target;
    }
    this.length = this.length + 1;
    return this;
  };

  /**
   * @param {number} position
   * @returns {T} target.val
   */
  getElement = (position) => {
    if (position < 0 || position > this.length - 1) return;
    let target = position > this.length / 2 ? this.tail : this.head;
    if (position > this.length / 2) {
      let index = this.length - 1;
      while (index-- > position) {
        target = target.prev;
      }
    } else {
      let index = 0;
      while (index++ < position) {
        target = target.next;
      }
    }
    return target.val;
  };

  /**
   * @param {T} element
   * @returns {number} index
   */
  indexOf = (element) => {
    let temp = this.head;
    let index = 0;
    while (temp) {
      if (temp.val === element) {
        return index;
      }
      temp = temp.next;
      index++;
    }
    return -1;
  };

  update = (position, element) => {
    const removed = this.removeAt(position);
    this.insert(position, element);
    return removed;
  };

  /**
   * @param {number} position
   * @returns {T} target.val
   */
  removeAt = (position) => {
    if (position < 0 || position > this.length - 1) return;
    let target = position > this.length / 2 ? this.tail : this.head;
    if (position > this.length / 2) {
      let index = this.length - 1;
      while (index-- > position) {
        target = target.prev;
      }
    } else {
      let index = 0;
      while (index++ < position) {
        target = target.next;
      }
    }
    target.prev && (target.prev.next = target.next);
    target.next && (target.next.prev = target.prev);
    this.length = this.length - 1;
    return target.val;
  };

  isEmpty = () => {
    return this.length === 0;
  };

  size = () => {
    return this.length;
  };

  toString = () => {
    return this.forwardString();
  };

  forwardString = () => {
    let node = this.head;
    let result = "";
    while (node) {
      result += node.val + "--";
      node = node.next;
    }
    return result.replace(/--$/, "");
  };

  backwordString = () => {
    let node = this.tail;
    let result = "";
    while (node) {
      result += node.val + "--";
      node = node.prev;
    }
    return result.replace(/--$/, "");
  };
}

(() => {
  const list = new DoublyLinkedList();
  list.append("AA");
  list.append("BB");
  list.append("CC");
  list.append("DD");
  console.assert(
    list.forwardString() === "AA--BB--CC--DD",
    "LoublyLinkedList append method is error!"
  );
  console.assert(
    list.backwordString() === "DD--CC--BB--AA",
    "LoublyLinkedList append method is error!"
  );
})();

(() => {
  const list = new DoublyLinkedList();
  list.insert(0, "AA");
  list.insert(1, "CC");
  list.insert(1, "BB");
  list.insert(3, "DD");
  console.assert(
    list.forwardString() === "AA--BB--CC--DD",
    "LoublyLinkedList insert method is error!"
  );
  console.assert(
    list.backwordString() === "DD--CC--BB--AA",
    "LoublyLinkedList insert method is error!"
  );
})();

(() => {
  const list = new DoublyLinkedList();
  list.insert(0, "AA");
  console.assert(
    list.indexOf("AA") === 0,
    "LoublyLinkedList indexOf method is error!"
  );
  console.assert(
    list.indexOf("A") === -1,
    "LoublyLinkedList indexOf method is error!"
  );
})();

(() => {
  const list = new DoublyLinkedList();
  list.update(0, "AA");
  list.update(0, "BB");
  list.update(1, "CC");
  list.update(2, "DD");
  list.update(1, "AA");
  list.update(20, "BB");
  console.assert(
    list.toString() === "BB--AA--DD",
    "DoublyLinkedList update method is error!"
  );
})();

(() => {
  const list = new DoublyLinkedList();
  list.removeAt(0);
  list.insert(0, "AA");
  list.insert(1, "BB");
  list.insert(2, "CC");
  list.insert(3, "DD");
  list.removeAt(0);
  list.removeAt(2);
  list.removeAt(1);
})();

