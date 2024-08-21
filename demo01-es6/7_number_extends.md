### 二进制表示法和八进制表示法
ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
```javascript
0b111110111 === 503 // true
0o767 === 503 // true
```
如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
```js
Number('0b111')  // 7
Number('0o10')  // 8
```

### 数值分隔符
ES2021，允许 JavaScript 的数值使用下划线（_）作为分隔符。
let budget = 1_000_000_000_000;

下面三个将字符串转成数值的函数，不支持数值分隔符。主要原因是语言的设计者认为，数值分隔符主要是为了编码时书写数值的方便，而不是为了处理外部输入的数据。

- Number()
- parseInt()
- parseFloat()
```js
Number('123_456') // NaN
parseInt('123_456') // 123
```

### Number.isFinite()和Number.isNaN()
ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。
- Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
- Number.isNaN()用来检查一个值是否为NaN。
> 这两个方法与传统的`isFinite/isNaN的区别在于, 传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效
```js
isFinite("25") // true
Number.isFinite("25") // false

isNaN("NaN") // true
Number.isNaN("NaN") // false
```

### Number.parseInt()和Number.parseFloat()
```js
// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

### Number.isInteger()
Number.isInteger()用来判断一个数值是否为整数。
```js
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
```
> JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）
> 如果一个数值的绝对值小于Number.MIN_VALUE（5E-324）, 会被自动转为0。Number.isInteger也会误判
> 总之，如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。
```js
// 明明不是整数, 却返回了true
Number.isInteger(3.0000000000000002) // true
// 明明是小数, 却返回了true
Number.isInteger(5E-325) // true
```

### Number.EPSILON
ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。Number.EPSILON的实质是一个可以接受的最小误差范围。

### 安全整数和Number.isSafeInteger()
JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。
`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。

实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。

### Math对象的扩展
ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。
- Math.trunc(x),  去除小数部分, 参数为非Number会自动转为Number, 参数为空值或undefine返回NaN
- Math.sign(),  判断正数/负数/0, 参数为非Number会自动转为Number。只有五种返回值(+1, -1, 0, -0, NaN) 
- Math.cbrt(),  计算一个数的立方根, 开三次方, 参数为非Number时会自动转为Number。
- Math.clz32(),  将参数转为32位无符号二进制整数的形式, 然后返回32位里面有多少个前导0。对于小数, clz32只考虑整数部分。
- Math.imul(a, b),   32位的有符号的乘法函数。于那些很大的数的乘法，低位数值往往都是不精确的，Math.imul方法可以返回正确的低位数值。
- Math.fround(), 返回一个数的32位单精度浮点数形式。
- Math.hypot()
对数相关的方法
- Math.expm1()
- Math.log1p()
- Math.log10()
- Math.log2()
双曲函数
- Math.sinh(x)
- Math.cosh(x)
- Math.tanh(x)
- Math.asin(x)
- Math.acosh(x)
- Math.atanh(x)


### BigInt数据类型

JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。
```javascript
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity
```


ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题，这是 ECMAScript 的第八种数据类型。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。为了与 Number 类型区别，BigInt 类型的数据必须添加后缀`n`。


BigInt 与普通整数是两种值，它们之间并不相等。

```js
42n === 42 // false
```

### BigInt函数

BigInt(123) // 123n
参数如果是小数，也会报错
BigInt(1.5) // RangeError

还提供了三个静态方法。

BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。
BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。
BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt。