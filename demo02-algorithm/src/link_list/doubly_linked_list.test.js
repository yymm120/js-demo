import test from "node:test";
import { DoublyLinkedList } from "./doubly_linked_list.js";
import assert from "node:assert";

let list = new DoublyLinkedList("AA", "BB", "CC", "DD", "EE", "FF");
/**
 * 练习双向链表的append方法
 */
function append(list, item) {
  let node = new list.Node(item);
  if (list.length === 0) {
    list.head = node;
    list.tail = node;
  } else {
    // 尾节点的下一个节点设置为新节点
    list.tail.next = node;
    // 新节点的上一个节点
    node.prev = list.tail;
    // 尾节点
    list.tail = node;
  }
  return list;
}

/**
 * 练习双向链表的insert方法
 */
function insert(list, position, item) {
  if (position < 0 || position > list.length) return;

  let node = new list.Node(item);
  if (position === list.length) {
    if (position === 0) {
      list.tail = node;
      list.head = node;
    } else {
      list.tail.next = node;
      node.prev = list.tail;
      list.tail = node;
    }
  } else {
    if (position === 0) {
      list.head.prev = node;
      node.next = list.head;
      list.head = node;
    } else {
    let target = position > list.length / 2 ? list.tail : list.head;
      if (position > list.length / 2) {
        let index = list.length - 1;
        while (index-- > position) {
          target = target.prev;
        }
      } else {
        let index = 0;
        while (index++ < position) {
          target = target.next;
        }
      }
      target.prev && (target.prev.next = node);
      target.prev = node;
      node.next = target;
      node.prev = target.prev;
    }
  }
  list.length = list.length + 1;
  return list;
}

// test("练习双向链表的append方法", () => {
//   assert.equal(append(list, "GG").toString(), "AA--BB--CC--DD--EE--FF--GG");
//   assert.equal(append(new DoublyLinkedList(), "GG"), "GG");
// });

test("练习双向链表的insert方法", () => {
  console.log(insert(list, 0, "GG").toString());
  console.log(insert(list, 1, "HH").toString());
  console.log(insert(list, 2, "II").toString());
});

// test("练习双向链表的removeAt方法", () => {

// })
