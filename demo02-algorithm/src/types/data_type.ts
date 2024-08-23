
export type NormalTree<T> = {
    val: T,
    children?: Array<NormalTree<T>>,
}


export type BinTree<T> = {
    val: T,
    left?: BinTree<T>
    right?: BinTree<T>
}

export type EntryNode<T> = {
    val: T | null,
    next?: EntryNode<T> | null,
}

export interface LinkedListType<T> {
    length: number,
    node: EntryNode<T> | null;
    insert: (index: number, data: T) => EntryNode<T> | null;
    removeAt: (position: number) => EntryNode<T>;
    append: (data: T) => void;
    toString: () => string;
    indexOf: (data: T) => number; 
    getData: (index: number) => T;
    update:(position: number, data:T) => EntryNode<T>;
    isEmpty: () => boolean;
    size: () => number;
}


export interface DoublyLinkedListNode<T> {
    prev: DoublyLinkedListNode<T> | null,
    val: T;
    next: DoublyLinkedListNode<T> | null,
}


export interface DoublyLinkedListType<T> {
    length: number,
    head: DoublyLinkedListNode<T> | null;
    tail: DoublyLinkedListNode<T> | null;
    append: (element: T) => DoublyLinkedListType<T>;
    insert: (position: number, element: T) =>  DoublyLinkedListType<T>;
    getElement: (position: number) => T;
    indexOf: (element: T) => number;
    update: (position: number, element: T) => T;
    removeAt: (position: number) => T;
    isEmpty: () => boolean;
    size: () => number;
    toString: () => string;
    forwardString: () => string;
    backwordString: () => string;
}