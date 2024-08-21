
### 块级作用域
1. let可以完全取代var
2. let和const之间, 优先使用const。编译器会对const进行优化。
3. 字符串一律使用单引号或反引号, 不适用双引号, 动态字符串使用反引号。
4. 优先使用解构赋值
5. 单行定义对象, 最后一个对象不以兜昊解位, 多行定义对象, 最后一个成员以逗号结尾
6. 对象尽量静态化, 一旦定义就不得随意添加属性。如果添加属性不可避免, 要使用Object.assign()方法

数组
使用扩展运算符拷贝数组
```js
const itemCopy = [...items];
```

使用Array.from()方法, 将类似数组的对象转为数组

函数
立即执行函数可以携程箭头函数的形式

哪些使用匿名函数的场合尽量使用箭头函数替代。

```js
[1, 2, 3].map(function (x) {
    return x * x;
})
// 替换为
[1, 2, 3].map(x => x*x);
```
箭头函数取代`Function.prototype.bind`, 不应该再用self/_this/that绑定this
```js
const self = this;
const boundMethod = function (...params) {
    return method.apply(self, params);
}
// 替换为
const boundMethod = (...params) => method.apply(this, params);
```

Map解构
尽量使用Map解构, 因为Map有内建的遍历机制。

Class
总是使用Class, 取代需要prototype的操作, 因为Class更易于理解
总是使用extends实现继承, 因为这样更简单, 不会破坏instanceof运算符的危险


模块
ES6模块语法时JS模块的标准写法。用它取代CommonJS

ESLint的使用
ESLint是一个语法规则和代码风格检查工具, 可以用来保证语法正确和统一的代码

先下载eslint, 然后安装airbnb语法规则, 以及import, a11y, react插件, 最后再项目根目录新建.eslintrc文件配置ESLint
```shell
npm install --save-dev eslint
npm install --save-dev eslint-config-airbnb
npm install --save-dev eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

```