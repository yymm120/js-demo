基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

### 类的写法
#### ES5的写法
```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```
#### ES6的写法
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

ES6 的类，完全可以看作构造函数的另一种写法。
```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```
上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
上面代码中，constructor()、toString()、toValue()这三个方法，其实都是定义在Point.prototype上面。
因此，在类的实例上面调用方法，其实就是调用原型上的方法。
```js
class B {}
const b = new B();

b.constructor === B.prototype.constructor // true
```
由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign()方法可以很方便地一次向类添加多个方法。
```javascript
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
prototype对象的constructor属性，直接指向“类”的本身
```javascript
Point.prototype.constructor === Point // true
```
另外，ES6通过class类定义的内部所有定义的方法，都是不可枚举的（non-enumerable）。与ES5不一致
```javascript
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype) // 不可枚举
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
ES5通过prototype定义的方法, 都是可以枚举的
```js
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function () {
  // ...
};

Object.keys(Point.prototype) // 可以枚举
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

### constructor()方法
constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。
constructor()方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
```js
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```
> 上面代码中，constructor()函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。
类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。


类的属性和方法，除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

与 ES5 一样，类的所有实例共享一个原型对象。
```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```
> `__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 `Object.getPrototypeOf()` 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
```js
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

### 实例属性的新写法
ES2022 规定了一种新写法。实例属性除了可以定义在constructor()方法里面, 也可以定义在类内部的最顶层。
```javascript
class IncreasingCounter{
    constructor() {
        this._count = 0
    }
}

class IncreaseingCounter{
    _count = 0;
}
```
注意，新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面。

### getter和setter
```javascript
class MyClass {
    constructor () {
        // ...
    }
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter' + value)
    }
}
var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```
存值函数和取值函数是设置在属性的 Descriptor 描述对象上的。

### 属性表达式
```js
let methodName = 'getArea';
class Square {
    constructor(length) {
        // ...
    }
    [methodName]() {
        // ...
    }
}
```
上面代码中，Square类的方法名getArea，是从表达式得到的。

### Class表达式
与函数一样, 类也可以使用表达式的形式定义。
```js
const MyClass = Class Me {
    getClassName() {
        return Me.name;
    }
}
```
如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。

```js
const MyClass = class { /* ... */ };
```
采用 Class 表达式，可以写出立即执行的 Class。
```js
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```
上面代码中，person是一个立即执行的类的实例。

### 静态方法
不会被实例获得的方法, 需要加上static关键字。该方法直接通过类来调用, 称为静态方法。
```js
class Foo {
    static classMethod() {
        return 'hello';
    }
}
Foo.classmMethod(); // 'hello'
```
> 如果静态方法包含this关键字, 这个this指的时类而不是实例。
父类的静态方法可以被子类继承。

静态方法也可以从super对象上调用

### 静态属性
静态属性是Class本身的属性, 即Class.propName而不是定义在实例this对象上的属性。
```js
class Foo {
}
Foo.prop = 1
```
目前只有这种写法可行, 因为ES6明确规定, Class内部只有静态方法, 没有静态属性。

### 私有方法和私有属性
早期私有方法的只能通过变通方式模拟。
1. 在方法名前面加下划线 `_method()`
```js
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```
2. 将方法从class内部放到class外部。
```js
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```
3. 利用Symbol值的唯一性。
```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass {
    foo(baz){
        // public method
    }
    [bar](baz){
        // private method
    }
}
```
> 上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，`Reflect.ownKeys()`依然可以拿到它们。
```js
const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]
```

### ES2022正式添加了私有属性/方法
```js
class IncreasingCounter {
    #count = 0; // 私有属性
    get value() {
        console.log('Getting the current value');
        return this.#count;
    }
    increment() {
        this.#count++
    }
    #sum() {
        // 私有方法
    }
}
```

### 静态块
静态属性的一个问题是, 如果它有初始化逻辑, 这个逻辑要么卸载外部, 要么写在constructor()方法里面。这两种方法都不是很理想，前者是将类的内部逻辑写到了外部，后者则是每次新建实例都会运行一次。

ES2022引入了静态块, 允许在类的内部设置一个代码块，在类生成时运行且只运行一次，主要作用是对静态属性进行初始化。以后，新建类的实例时，这个块就不运行了。
```js
class C {
  static x = ...;
  static y;
  static z;

  static {
    try {
      const obj = doSomethingWith(this.x);
      this.y = obj.y;
      this.z = obj.z;
    }
    catch {
      this.y = ...;
      this.z = ...;
    }
  }
}
```
除了静态属性的初始化，静态块还有一个作用，就是将私有属性与类的外部代码分享。
```js
let getX;

export class C {
  #x = 1;
  static {
    getX = obj => obj.#x;
  }
}

console.log(getX(new C())); // 1
```

### name属性
本质上, ES6只是ES5的构造函数的一层包装, 所以函数的许多特性都被class继承, 包括name属性。

```js
class Point {}
Point.name // Point
```
name属性总是返回紧跟在class关键字后面的类名。

### Generator方法
如果在某个方法前加上*号, 叫表示一个Generator函数。
```js
class Foo {
    constructor (...args) {
        this.args = args;
    }
    * [Symbol.iterator] () {
        for (let arg of this.args) {
            yield arg;
        }
    }
}
```

### this的指向
类的方法内部如果含有this, 它默认指向类的实例, 但是, 必须非常小心, 一旦使用该方法, 很容易报错。
```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。

一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
```js
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```
另一种解决方法是使用箭头函数, 箭头函数内部的this总是指向定义时所在的对象。
```js
class Obj {
  constructor() {
    this.getThis = () => this;
  }
}

const myObj = new Obj();
myObj.getThis() === myObj // true
```

### new.target属性
new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```
Class 内部调用new.target，返回当前 Class。
```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```
需要注意的是，子类继承父类时，new.target会返回子类。
```js
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length, width) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
```
利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
```js
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```