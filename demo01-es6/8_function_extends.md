### 基本用法
ES6 之前，不能直接为函数的参数指定默认值。ES6之后, 可以赋予默认值。
```js
function log(x, y = 'World') {
  console.log(x, y);
}
```
一个容易忽略的地方是, 参数默认值是惰性求值的。
```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
```

