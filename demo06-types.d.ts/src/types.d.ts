

type Ok<T> = {type: 'success', data: T}
type Err<T> = { type: 'err', data: T}

export type ComplexType<V, E> = Ok<V> | Err<E>

export const Types = {
    ComplexType: ComplexType
}