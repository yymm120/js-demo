/**
 * @import {LinkedList, Entry} from '../types/data_type'
 */


/**
 * @type {Entry<string>}
 */
const a = {
    val: 'a',
}

/**
 * @type {Entry<string>}
 */
const b = {
    val: 'b'
}

/**
 * @type {Entry<string>}
 */
const c ={
    val: 'c'
}

/**
 * @type {Entry<string>}
 */
const d = {
    val: 'd'
}

a.next = b;
b.next = c;
c.next = d;



const ss = ['a', 'b', 'c', 'd'];
let p = {}
while (ss.length > 0) {
    p.next = {val:ss.pop()}
}

// const e = {val: 'e'}
// c.next = e;
// e.next = d;

// c.next = d;