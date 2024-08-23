/**
 * @import {LinkedListType, EntryNode} from '../types/data_type'
 */

/**
 * 单向链表
 * @implements {LinkedListType<T>}
 * @template {object} T
 */
class LinkedList {
    length= 0;
    node = null;  // 指向第一个Node

    /**
     * @implements {EntryNode<T>}
     */
    Node = class EntryNode {
        val = null;
        next = null;
        constructor(val) {
            this.val = val;
        }
    }

    /**
     * @param {T} [data]
     */
    append(data) {
        const newNode = new this.Node(data);
        if (this.length === 0) {
            this.node = newNode
        } else {
            let point = this.node;
            while (point.next !== null) {
                point = point.next;
            }
            point.next = newNode;
        }
        this.length++;
    }

    toString() {
        let point = this.node;
        let result = '';
        while(point) {
            result += point.data + ' ';
            point = point.next;
        }
        return result;
    }

    /**
     * @param {number} position 
     * @param {T} data 
     */
    insert(position, data) {
        if (position < 0 || position > this.length) {
            return ;
        }
        const newNode = new this.Node(data);
        if (position === 0) {
            newNode.next = this.node;
            this.node = newNode;
        } else {
            let temp = this.node;
            let previousNode = null;
            let index = 0;
            while (index++ < position) {
                previousNode = temp;
                temp = temp.next;
            }
            newNode.next = temp;
            previousNode.next = newNode;
        }
        this.length++;
        return newNode;
    }

    /**
     * @param {number} position 
     */
    getData(position) {
        if (position <0 || position > this.length) return null;
        let temp = this.node;
        let index = 0;
        while (index++ < position) {
            temp = temp.next;
        }
        return temp.data;
    }

    /**
     * @param {T} data 
     */
    indexOf(data) {
        let temp = this.node;
        let index = 0;
        while (temp) {
            if (temp.data === data) {
                return index;
            }
            temp = temp.next;
            index++;
        }
        return -1;
    }

    /**
     * @param {number} position 
     * @param {T} data 
     */
    update(position, data) {
        if (position < 0 || position > this.length) return false;
        let node = this.node;
        let index = 0;
        while(index++ < position) {
            node = node.next;
        }
        node.data = data;
        return node;
    }

    /**
     * @param {number} position 
     * @returns 
     */
    removeAt(position) {
        if (position < 0 || position >= this.length) return null;
        let node = this.node;

        if (position === 0) {
            this.node = this.node.next;
        } else {
            let index = 0;
            let node_prev = null;
            while (true) {
                if (index === position) {
                    node_prev = node.next;
                    break;
                } else {
                    node_prev = node;
                    node = node.next;
                }
                index++;
            }
        }
        this.length--;
        return node;
    }

    /**
     * @param {T} data 
     */
    remove(data) {
        this.removeAt(this.indexOf(data));
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }

}

 



new LinkedList().append()