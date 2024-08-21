
### let
let是ES6新增的命令, 用于声明变量。let与var类似, 但let只在代码块内有效。

#### let不会变量提升
```javascript
{
    let a = 10;
    var b = 10;
}
a //undefine
b // 10
```
var声明的变量, 在全局范围内有效。

- var存在变量提升, 在声明变量之前就能够使用变量, 变量的值为undefine。
- let不存在变量提升, 在变量声明之前无法使用变量, 否则报错。

#### let会导致暂时性死区
- 在ES6中, 如果代码块内存在let和const， 从一开始就形成了封闭作用域，凡是在声明前使用变量都会报错。这在语法上称为暂时性死区TDZ。
- 暂时性死区意味着, 代码块内存在let或const时, `typeof undeclare_variable`会报错。

```javascript
{
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  typeof tmp; // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(typeof tmp); // 123
}
```
#### let不能在同一代码块中重复声明
- 不允许在同一代码块内重复声明let
```javascript
{
  let a = 10;
  let a = 1; // 报错
}
function func(arg) {
    let arg; // 报错
    {
        let arg; // 不报错
    }
}
```

#### 作用域
- ES5只有全局作用域和函数作用域。函数只能在全局作用域和函数作用域中声明, 且不能在块级作用域中声明函数。
- ES6新增块级作用域。语序在块级作用域中声明函数。
```javascript
if (false) {
    // 块级作用域中声明函数
    function f() { console.log('I am inside!'); }
  }
```
> 标准规定, 在块级作用域中定义函数，行为与let相同。但是在浏览器中, 块级作用域中定义函数, 行为类似于var。(浏览器中是为了兼容性, 是个特例)

### const
- const是一个只读常量, 必须立即初始化。
- const作用域与let相同, 只在块级有效

#### const只能保证引用地址的数据不能改动
- 简单数据类型的值就保存在地址中, 等同于常量。但复合类型的数据, 只能保证地址不被改动, 内部的元素完全有可能变化。
- 如果希望将对象冻结, 应该使用object.freeze方法。
```javascript
const foo = object.freeze({})
foo.prop = 123; // 常规模式下, 不起作用; 严格模式下, 报错
```
- 如果对象的属性也是引用类型, 应该将对象的属性也冻结起来。
```javascript
// 如果对象的属性是object类型, 那么也冻结起来。
let constantize = (obj) => {
    object.freez(obj);
    object.keys(obje).forEach( (key, i) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    })
}
```

### ES6声明变量的6种方式
- var/function (ES5) let/const/import/class (ES6)

### global和window对象
- 顶层对象, 在浏览器中指的是window, 在Node中指的是global。顶层对象属性与var/function声明的全局变量是等价的。但let/const/import/class声明的全局变量不属于顶层对象的属性。
```javascript
window.a = 1; // 顶级对象属性
var a = 1; // 等价于var声明的全局变量

let b = 1; // let声明的变量
window.b; // 未定义
```

### GlobalThis对象
- java语言中存在一个顶层对象, 用于提供全局环境(全局作用域)。但是顶层对象在各种实现里面是不统一的。
> 浏览器里面, 顶层对象是window。但Node和Web Worker没有window
> 浏览器和web worker里, self也指向顶层对象, 但是Node没有self
> Node里面, 顶层对象是global, 其他环境都不支持。

- 为了实现统一段代码能够在各种环境中都能取到顶层对象, ES2020后可以使用globalThis关键字, 在任何环境下都可以从它拿到顶层对象。