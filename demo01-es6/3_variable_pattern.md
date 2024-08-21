
### 数组解构赋值
```javascript
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [ , , third] = ["foo", "bar", "baz"];
let [head, ...tail] = [1, 2, 3, 4];
let [x, y, ...z] = ['a'];
```

#### 依靠Iterator接口
> 事实上, 只要某个数据解构具有Iterator接口, 都可以采用数组形式的解构。
```javascript
// fibs是一个Generator函数
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

#### 解构赋值允许指定默认值
```javascript
let [foo = true] = [];
// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值
let [x = f()] = [1]; // f()函数根本不会执行
```

### 对象解构赋值
```javascript
// 变量必须与属性同名，才能取到正确的值。
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// 如果变量名需要自定义, 则必须携程下面这样
let { foo: foo_var, bar: bar_var } = { foo: 'aaa', bar: 'bbb' };
```

#### 对象解构赋值允许指定默认值
```javascript
let { message: msg = 'Something went wrong' } = {};
var {x = 3} = {x: null}; // 因为右边x为null, null !== undefine, 所以默认值不生效
var {x = 3} = {x: undefined}; // 因为右边x为undefine, undefine === undefine, 所以默认值等于3生效
```

#### 数组也可以进行对象属性的解构
- 由于数组的本质是特殊的对象, 因此可以对数组进行对象属性的解构
```javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
```

### 字符串的解构赋值
```javascript
const [a, b, c, d, e] = 'hello';
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
let {length : len} = 'hello';
```

### 数值和布尔值的解构赋值
- 解构赋值时, 如果右边是数值和布尔值, 则会先转为对象
- 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
```javascript
// toString是一个函数, 可以通过prototype拿到
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

### 解构赋值的用途
#### 交换变量的值
```javascript
let x = 1;
let y = 2;

[x, y] = [y, x];
```

#### 提取json数据
```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;
```
#### 遍历Map解构
> 任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。
```javascript
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
```