
export type NormalTree<T> = {
    val: T,
    children?: Array<NormalTree<T>>,
}


export type BinTree<T> = {
    val: T,
    left?: BinTree<T>
    right?: BinTree<T>
}

export type Entry<T> = {
    val: T,
    next?: Entry<T> | null,
}
export type LinkedList<T> = {
    val: T,
    next?: T | null,
    insert?: (index: number) => void;
    get?: (index: number) => T;
    remove?: (t: T) => T;
}

