
ES6之前, 社区指定了一些模块加载方案, 最常用的有CommonJS和AMD两种方案。前者用于服务器, 后者用于浏览器。
ES6之后, 提供了模块功能。

CommonJS和AMD模块, 只能在运行时确定模块的依赖关系, `require`函数会在运行时查找相应的模块, 并生成一个fs对象。
```js
let fs = require('fs'); // CommonJS导入模块举例
```

由于ES6的模块是在编译时加载, 属于静态加载, 这为类型检查和静态分析(如Typescript)提供了可能。


### 严格模式
ES5引入了严格模式, 但需要声明。ES6的模块自动采用严格模式, 不管有没有加上'use strict'
严格模式有以下限制:
- 变量必须声明后再使用。
- 函数的参数不能同名
- 不能使用with语句
- 不能对只读属性赋值
- 不能使用前缀0表示八进制数
- 不能删除不可删除的属性
- 不能删除变量, 例如`delete prop`会报错, 只能删除属性, 例如`delete global[prop]`
- eval不会再它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字(比如protected, static 和 interface)

### export 命令
一个文件就是一个独立的模块, export 用于规定模块中哪些内容被导出。
```js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

export语句输出的接口, 与其对应的值时动态绑定关系, 可以通过该接口渠道内部实时的值。而CommonJS输出的值时缓存, 不可能动态更新。
```js
export let foo = 'bar'
setTimeout(() => foo = 'baz', 500);
```

### import 命令
import用于导入export导出的内容。
- import会被静态分析, 它会先于其他语句执行,只能写在最外层。
- 可以为变量重新取一个名字 `as`
- import导入的变量都是只读的, 不能被改写。但修改变量的属性,可以成功, 建议不要这样做, 否则后期很难排查错误。
- import命令具有提升效果, 因此在声明import前是可以使用的。
- `import 'lodash'`会执行加载的模块, 但是不会输入任何值。
- 通过Babel转码, CommonJS的`require`和ES6的`import`可以同时使用, 但最好不要这样做。


### import和export的复合写法
import和export可以写在一起。
```js
export {foo, bar} from 'my_module'; 

// 类似于以下写法, 但是在该模块内不能使用foo和bar
import {foo, bar} from 'my_module';
export {foo, bar};
```

### import函数
CommonJS是通过require函数进行动态加载模块, 因此可以通过if实现条件加载。
而import 语句只能写在最外层, 并且在编译期间就执行, 无法实现动态加载。

ES2020引入了一个`import`函数, 支持动态加载模块。
```js
import(specifier)
```
举例
```js
const main = document.querySelector('main');
import(`./section-modules${somvariable}.js`)
    .then(module => {
        module.loadPageInto(main);
    }).catch(err => {
        main.textContent = err.message;
    })
```

import()函数和CommonJS中的`require`的主要区别在于, `require`是同步加载, `impor()t`是异步加载.

#### 适用场合
- 按需加载
button.addEventListener('click', event => {
    import('./dialogBox.js').then().catch();
})
- 条件加载
if (condition) {
    import()
} else {
    import()
}
- 动态的模块路径
import(f())

#### 同时加载多个模块
如果想同时加载多个模块, 可以使用以下写法。
```js
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

### import.meta
如果开发时, 需要知道模块本身的一些信息, 可以使用import.meta。
```js
// 1. import.meta.url
import.meta.url
// 2. import.meta.scriptElement
import.meta.scriptElement
// 3. deno现在还支持以下属性
import.meta.filename
import.meta.dirname
```


### 浏览器加载模块
#### 1 传统方法
```html
<script type="application/javascript">
    // module code
</script>
<script type="application/javascript" src="path/to/some.js">
</script>
```
> `type="application/javascript"`可以省略, 这是ES5的默认方式。ES6需要指定`type="module"`。
默认情况下, 浏览器会同步加载模块, 并同步的执行模块内容。可以使用`async`或`defer`属性让渲染引擎异步加载
defer和async的区别是: defer要等到整个页面渲染结束才会执行, async则一旦下载完成, 渲染引擎会立即终端, 执行完脚本后再渲染。
> 一句话: defer是渲染完再执行, async是下载完就执行。多个defer可以保证加载顺序, 多个async不能保证加载顺序。

#### 2 加载规则
浏览器加载ES6模块, 也使用`<script>`标签, 但是必须加入`type=module`属性。
只要带有`type="module"`就都是异步加载, 并且等同于`defer`属性, 可以保证加载顺序。
```html
<script type="module">
</script>
```
> 在es6中, 代码是在模块作用域中运行的, 而不是全局作用域。意味着最外层声明的变量不等于顶层变量的属性。this关键字也不指向`window`

#### ES6模块和CommonJS模块的差异

- CommonJS输出的是一个值的拷贝, ES模块输出的是值的引用
- CommonJS是运行时加载, ES模块是编译时加载
- CommonJS模块的require是同步加载, ES6模块的import是异步加载。

> 第二个差异是因为CommonJS加载的是一个对象(module.exports属性), 该对象只有在脚本运行完才会生成。


### NodeJs的模块加载方法
javascript现在又两种模块, 一种是ES6模块, 简称ESM, 一种是CommonJS模块, 简称CJS。
CommonJS模块是Node专用的, 与ES6模块不兼容。
CommonJS通过require和module.exports导入和导出。
但是从Node13开始, Node默认打开ES6模块的支持。, 但必须要求我们采用.mjs后缀。如果不希望将后缀名改为mjs, 可以在package.json中指定type为module, 一旦设置之后, 所有js脚本被解释为ES6模块, 如果这时候想用CommonJS, 就必须将后缀名改为cjs。
type: "module" 是ES6
type: "commonjs" 是CommonJS
总结: mjs以ES6模块加载, cjs以CommonJS加载, js文件的加载取决于package.json中的type字段


### main字段
package.json有两个字段可以指定模块入口文件。
main和export
```json
{
    "type": "module",
    "main": "./src/index.js"
}
```
exports字段的优先级高于main
指定脚本或子目录别名
```json
{
    "export": {
        "./submodule": "./src/submodule.js"
    }
}
```
设置子目录别名的例子
```json
{
    "exports": {
        "./fetures/": "./src/features/"
    }
}
```
如果exports字段别名是`.`, 就表示模块的主入口, 优先级高于main, 可以直接简写成exports
```json
{
    "exports": {
        ".": "./main.js"
    }
}
//等于
{
    "exports": "main.js"
}
```

### commonjs模块加载ES6模块
CommonJS的require命令不能加载ES6模块, 会报错。只能通过`import()`函数来加载。
```js
(async () => {
    await import('./my-app.mjs')
})()
```

### ES6模块加载CommonJS模块
ES6可以加载CommonJS模块, 但是只能整体加载, 不能只加载单一项
```js
import  packageMain from 'commonjs-package';
```

### 同时支持两者格式的模块
如果是ES6模块, 用以下代码提供一个整体导出。
```js
export default obj
```

如果是CJS模块,
```js
import cjsModule from '../index.js';
export const foo = cjsModule.foo;
```
另一种做法是在package.json中的exports字段中, 指明两者模块各自的加载入口
```json
"exports": {
    "require": "./index.js",
    "import": "./esm/wrapper.js"
}
```
上面代码指定`require()`和`import`加载模块会自动切换到不同的入口文件。

### Nodejs的内置模块
```js
// 整体加载
import EventEmitter from 'events';
const e = new EventEmitter();
// 加载单一项
import {readFile} from 'fs';
readFile('./foo.txt', (err, source) => {
    if (err) {
        console.error(err)
    } else {
        console.log(source)
    }
})
```

### 加载路径
ES6模块加载路径必须给出脚本完整路径, 不能省略脚本的后缀名。
```js
import {something} from './index'; // ES6中将会报错
```

### ES6内部变量

在ES6模块中, 顶层的this关键字指向undefined
CommonJS模块的顶层this指向的是当前模块

- arguments
- require
- module
- exports
- __filename
- __dirname

这些关键字在ES6中是不存在的





















