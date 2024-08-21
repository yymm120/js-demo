### 常用语句
#### 输出方式
使用 window.alert() 弹出警告框。
使用 document.write() 方法将内容写到 HTML 文档中。
使用 innerHTML 写入到 HTML 元素。
使用 console.log() 写入到浏览器的控制台。

#### 

### 语法
#### 1 数据类型
7个原始类型 + 1个object类型

##### 1 Null
Null类型只有一个值: null

##### 2 undefined
undefined类型只有一个值: undefined
从概念上讲, undefined表示值的缺失, null表示对象的确实。
当某些东西没有值时, 默认undefined: 
- `return;`, 隐式返回undefined
- `obj.idontExist`, 访问不存在的属性
- `let x;`, 声明变量未初始化
- 许多`Array.prototype.find()`和`Map.prototype.get()`之类的方法, 当没有找到元素时, 返回undefined。
null使用频率较少, 最重要的地方是原型链的末端, 其次是与原型交互的方法, 如`object.getPrototypeOf()`和`object.create()`等方法,接受或返回null而不是undefined。

null是一个关键字, 但undefined是一个普通的标识符, 好是一个全局属性, 因为undefined不应该被重新定义或者这笔。

##### 3 Boolean类型
true | false

##### 4 Number类型
是一个双精度二进制格式的值, 可以存储2^{-1074}和2^{1024}之间的正浮点数和-2^{-1024}和-2^{1024}之间的负浮点数。
但是它仅仅能安全的存储在-(2^{53} -1)到2^{53}-1范围内的整数, 超过这个范围, 它不能精确表示; 但是它会有双精度浮点近似表示。
> Number.isSafeInteger()检查一个数是否在安全的整数范围内。

±(2-1074 ~ 21024) 范围之外的值会自动转换：
大于 Number.MAX_VALUE 的正值被转换为 +Infinity。
小于 Number.MIN_VALUE 的正值被转换为 +0。
小于 -Number.MAX_VALUE 的负值被转换为 -Infinity。
大于 -Number.MIN_VALUE 的负值被转换为 -0。

NaN - Not a Number, 一个唯一不等于自身的值。


##### 5 BigInt类型
表示 任意大小的整数。BigInt可以安全地存储和操作巨大的整数。
```js
const y = 123n; // 末尾n
const x = BigInt(Number.MAX_SAFE_INTEGER); 
```
可以使用大多数运算符处理 BigInt，包括 +、*、-、** 和 %。——唯一被禁止的是 >>>。
BigInt 并不是严格等于有着相同数学值的 Number，而是宽松的相等。
BigInt 不能表示小数，但可以更精确地表示大整数。这两种类型都不能相互替代。



##### 6 String类型
JavaScript 字符串是不可变的。这意味着一旦字符串被创建，就不可能修改它。

##### 7 Symbol类型
Symbol是唯一并且不可变的原始值并且可以用来作为对象属性的键（如下）。在某些程序语言当中，Symbol 也被称作“原子（atom）类型”。symbol 的目的是去创建一个唯一属性键，保证不会与其他代码中的键产生冲突。



##### 8 Object对象
object并非原始类型。在计算机科学中, object指内存中可以被标识符引用的一块区域。
在js中, 对象是唯一可变的值。

对象的属性, 要么是字符串类型, 要么是Symbol类型。属性的值可以是任何类型。
有两种对象属性类型: 数据属性和访问器属性。每个属性都有对应的特征。可以通过`object.defineProperty()`设置它们, 或者通过`object.getOwnPropertyDescriptor()`读取它们。
###### 数据属性
数据属性通过以下属性来描述
- value: 可以是任意的javascript值
- writable: boolean
- enumerable: boolean, 一个布尔值，表示是否可以通过 for...in 循环来枚举属性。
- configurable: boolean, 表示该属性是否可以删除，是否可以更改为访问器属性，并可以更改其特性。

###### 访问器属性
- get: 函数签名, 无参数
- set: 函数签名, 接受一个参数
- enumerable: boolean, 表示是否可以通过for...in来枚举
- configuration: boolean, 表示是否可以删除, 是否可以更改访问器属性, 并可以更改其特性


###### Date 日期
js内置日期处理工具 `Date`

###### 索引类集合: 数组和类型化数组
数组是一个以整数作为key的对象 `{}`, 并与`length`相关联。

此外, 数组继承了Array.prototype的一些操作数组的便捷方法。

类型化数组表示底层二进制缓冲区的类数组视图, 它是一系列数据解构的总话术语, 包括Int8Array, Float32Array等等。
类型化数组通常与ArrayBuffer和DataView一起使用。

###### 带key的集合: Map, Set, WeakMap, WeakSet
WeakMap和WeakSet只允许将可垃圾回收的值作为key, 这些key要么是对象, 要么是未经注册的Symbol, 这两个解构专用于优化内存使用。

###### JS内置对象标准库
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects


###### 强制类型转换
除了null, undefined, Symbol的数据类型, 都有强制转换过程。


#### 2 语句和声明
##### 1 按类别分类
###### 控制流程
- retrun
- break
- continue
- throw
- if...else
- switch
- try...catch
###### 变量声明
- var
- let
- const
###### 函数和类
- function
- function*
- async function
- async function*
- class
###### 迭代
- do...while
- for
- for...in : 迭代一个对象的所有"可枚举"的属性, 包括继承的可枚举属性。 如果只想迭代自身属性, 则不能使用for in, 而是通过object.keys。
- for...of : 迭代一个"可迭代对象"的值。例如Array, Map, String这些事可迭代对象。和for in的区别是迭代的主体不同。
- for await...of
- while
###### 其他
- 空语句
- 块语句
- 表达式语句
- debugger
- export
- import
- label


##### 语句和声明的区别
六种基本声明
- let
- const
- function
- class
- import
- export
另外还有
- async function
- async function*
- function*
除了上面的声明外, 其余的全是语句
#### 3 表达式和运算符
##### delete
用于删除对象的一个属性, 如果该属性的值是一个对象, 并且没有更多对该对象的引用, 该属性所持有的对象最终会自动释放。
> delete只影响自身属性。如果对象的原型链上有同名属性, 则还可以使用原型链上的属性。
> 不可配置的属性不能被移除, 意味着Math, Array, Object这些内置对象和Object.defineProperty()设置的属性不能被删除。
```js
delete foo.bar
delete Foo.prototype.bar
```
- 删除数组元素时, 数组长度不受影响

删除不可配置属性, 会失败
```js
const Employee = {};
Object.defineProperty(Employee, "name", { configurable: false });

console.log(delete Employee.name); // 返回 false
```

##### new
new关键字允许我们创建一个实例。
在用new关键字创建实例的时候, 实际会做一些操作:
1. 创建一个空的对象。
2. 然后构造函数的this和这个空对象绑定。
3. 之后再构造函数中就可以使用this关键字进行赋值。
> 如果不使用new关键字, 构造函数也可以被调用, 但是不会创建新的对象。而且this的指向也是不一样的。

`new.target`用来检查函数是否是通过new来调用的。

ES6之后, js中内置对象, 有些不能通过new来创建实例, 有些只能通过new来创建实例。


##### new.target
如果通过new来调用构造函数, 在构造方法中, new.target指向构造函数本身。

##### instanceof
instanceof用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
> instanceof用来检测constructor.prototype是否存在于类的原型链上。
```js
function C() {}
var o = new C();
o instanceof C; // 因为getPrototypeOf(o) === C.prototype
```

##### typeof
typeof运算符返回一个字符串, 判断操作数的类型是什么.
typeof只有9种返回值
7个基本类型的小写形式的字符串 + "function", 其他任何对象都返回"object", 包括null也是返回"object"
如果用new创建一个实例, typeof返回"object", 有一个例外"new Function()"返回的是一个"function"


##### in
如果指定的属性在对象或者它的原型链中, 则in返回true


#### 3 闭包 closure
一个函数以及其捆绑的周边环境状态。在 JavaScript 中，闭包会随着函数的创建而被同时创建。
闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。

通常, 在只有一个方法的对象的地方, 都可以使用闭包替代。

闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function () {
    return this.name;
  };

  this.getMessage = function () {
    return this.message;
  };
}
```
在这个例子中, 我们并没有利用到闭包的好处。因此可以避免闭包。改为如下写法:
```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function () {
  return this.name;
};
MyObject.prototype.getMessage = function () {
  return this.message;
};
```


#### 4 相等性判断
JavaScript 提供三种不同的值比较运算：
- `===`——严格相等（三个等号）
- `==`——宽松相等（两个等号）
- `Object.is()`

双等号（==）1. 将执行类型转换 2. 对NaN, +0/-0特殊处理, 使得(NaN!=NaN, -0 == +0)
三等号（===）1. 不进行类型转换；如果类型不同，则返回 false；2. 仍对NaN, +0/-0特殊处理, 使得(NaN!=NaN, -0 == +0)
Object.is() 1. 既不进行类型转换, 2. 也不对NaN, -0和+0特殊处理

> 数组索引查找方法 / switch case语句 都是采用的 === 严格相等

宽松等于的行为: 
1. 对象和对象比, 比引用地址
2. 对象和原始类型比,
    如果转换后是相同类型, 则正常比较
    如果转换后存在Symbol, 则直接返回false
    如果转换后存有一方为Boolean, 将true变为1, false变为0, 然后再比较
    如果字符串和数字比, 则将字符串转为数字, 转换失败导致NaN, 返回false
    如果数字和大整型比, 按数值比较
    如果字符串和大整型比, 将字符串转为大整型, 转换失败, 返回false

大多数情况不建议使用宽松相等, 手动转型, 然后使用严格相等可以更好的预测结果。

什么时候使用Object.is()而不是`===`?
建议避免使用 Object.is，而改用 ===。除非需要关注 Object.is 对零的特殊行为。




#### 5 函数
每个函数其实都是一个Function对象。如果函数没有使用return语句, 则默认返回undefined。

函数执行时, this关键字并不会指向函数本身, 而是指向调用该函数的对象。

> 虽然每个function声明的函数都是一个Function对象, 但是不推荐使用new Function()构造函数创建函数。因为它会阻止一些JS引擎优化。也无法做到闭包。



#### 6 类
类实际上是特殊的函数。用typeof 类名的时候, 得到的其实是一个"function"
- 构造函数的声明              constructor
- 公有字段/私有字段的定义      有无#
- 共有方法/私有方法的定义      有无#
- 静态方法和静态字段的定义     通常是实用函数, 如创建或克隆对象的函数 和 适合缓存的属性等等
- getter/setter的定义

##### 继承
extends关键字继承父类, 同时在构造函数中用super调用一下父类的构造函数。




#### 7 错误

#### 8 严格模式

### 内置对象的使用

#### Function
Function对象提供了用于处理函数的方法, 每个函数实际上都是一个Function对象
它提供了一些实例方法, apply, bind, call
用这个对象创建函数和用function关键字创建函数的区别是, 它不会创建当前环境的闭包。
- apply: 将第一个对象作为this, 第二个对象作为参数
- bind: 绑定一个新的函数
- call: 执行方法, 第一个对象作为this, 后面可以添加任意个可选参数。


#### 关联数组
普通数组的实质是一个对象, 当不使用中括号, 而是使用{}是就被称为关联数组。
关联数组又被称为Map或者字典。


### 继承和原型链
js中, 每个对象都有一个私有属性prototype原型。原型也是一个对象, 它也有一个prototype属性, 这个prototype又指向另一个对象, 直到某个对象的这个prototype属性的值为null时, 原型链终止。
> 这种模式实现的继承很容易把人绕晕, 但是js的开发者认为这样实现的类型系统更加强大。
#### 属性的继承
当访问js对象上的某一个属性时, 不仅在该对象上搜寻, 还会搜寻这个对象的原型, 原型的原型, 层层向上搜索。
> 指定对象的prototype有多种方式, `__proto__: {}` 当对象的属性中存在`__proto__`时, 会直接创建一原型对象。
> 此时的原型链看起来像这样: `{对象} -> {原型} -> object.prototype -> null`
> 也可以创建更长的原型链: `{__proto__: {__proto__: {}}}` 

#### 方法的继承
方法的继承和属性的继承是一样的。因为js中, 任何函数都可以添加到对象上作为其属性。

#### 构造函数和性能
使用构造函数加new关键字创建实例的速度很快, 并且很容易被JIT优化。

性能: 在原型链上查找属性可能对性能产生负面影响, 尝试不存在的属性会遍历整个原型链。
要检查对象自身上的属性而不是在原型链上的某个地方, 有必要使用hasOwnProperty方法。


js中所有构造函数都有一个prototype的属性, 它于new运算符一起使用。