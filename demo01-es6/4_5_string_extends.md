### 字符串的Unicode表示法
"\u{20BB7}"

### 字符串的遍历器接口
ES6为字符串添加了遍历器接口
```javascript
for (let codePoint of 'foo') {
    console.log(codePoint); // codePoint译为码点
}
```

### javascript五个不支持的字符
javascript中有5个字符不能直接输入
- U+005C：反斜杠（reverse solidus)       必须转义为`\\`或`\U+005C`
- U+000D：回车（carriage return）
- U+2028：行分隔符（line separator）
- U+2029：段分隔符（paragraph separator）
- U+000A：换行符（line feed）

### JSON.stringify()
为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。
```javascript
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
```

### 标签模板
- 模板字符串可以紧紧跟在函数名后面, 该函数将被调用处理这个模板字符串。这杯称为标签模板功能。
```javascript
alert`hello`
// 等同于
alert(['hello'])
```
- 模板字符串中的${}会变为第二个-第N个参数
```javascript
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

function tag(stringArr, ...values){
  // ...
}
```
- 标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
```javascript
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```
- 标签模板的另一个应用，就是多语言转换（国际化处理）。
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`

### 字符串的新增方法
#### String.fromCodePoint
String.fromCodePoint(0x20BB7)
// 告

#### String.raw
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
String.raw`Hi\\n`
// 返回 "Hi\\\\n"
String.raw = function (strings, ...values) {
    // ...
  return output;
}

#### "".codePointAt
codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true

#### "".normalize
// unicode有两种表示方法, 它们应该等价, 但是javascript不能识别。
// normalize()方法将两种表示统一为同样的形式, 被称为unicode的正规化
'\u01D1'.normalize() === '\u004F\u030C'.normalize()

#### "".includes/startsWith/endWith
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

#### "".repeat
repeat方法返回一个新字符串，表示将原字符串重复n次。
'x'.repeat(3) // "xxx"

#### "".padStart/padEnd
padStart()用于头部补全，padEnd()用于尾部补全。
'x'.padStart(5, 'ab') // 'ababx'

#### "".trimStart/trimEnd
trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

#### "".replaceAll
'aabbcc'.replaceAll('b', '_')

#### "".at
at()方法接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。

#### "".toWellFormed
ES2024 引入了新的字符串方法toWellFormed()，用来处理 Unicode 的代理字符对问题（surrogates）。具体来说，UTF-16 规定，U+D800至U+DFFF是空字符段，专门留给代理字符对使用。只要遇到这个范围内的码点，就知道它是代理字符对，本身没有意义，必须两个字符结合在一起解读。其中，前一个字符的范围规定为0xD800到0xDBFF之间，后一个字符的范围规定为0xDC00到0xDFFF之间。

看下面的例子，encodeURI()遇到单个的代理字符对，会报错。
```javascript
const illFormed = "https://example.com/search?q=\uD800";

encodeURI(illFormed) // 报错
toWellFormed()将其转换格式后，再使用encodeURI()就不会报错了。

const illFormed = "https://example.com/search?q=\uD800";

encodeURI(illFormed.toWellFormed()) // 正确
```