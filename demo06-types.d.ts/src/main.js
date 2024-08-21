
/**
 * 在js中引入d.ts中的类型, 以在js中提供静态检查
 * @import * as Some from "./types.d.ts"
 */


/**
 * @type {Some.ComplexType<number, number>}
 */
const a = {
    type: 'success',
    data: 1
}


/**
 * @type {Some.Ok<number>}
 */
const ok = {
    type: "success",
    data: 0
}


function foo(complexType) {
    
}