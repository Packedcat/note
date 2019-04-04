### ECMA-262编程规范

```javascript
// 规则1：表示区块起首的大括号，不要另起一行。
// eg:
return
{
	key: value;
};
// =>
return;
{
	key: value;
};
```

```
规则2：调用函数的时候，函数名与左括号之间没有空格。
规则3：函数名与参数序列之间，没有空格。
规则4：所有其他语法元素与左括号之间，都有一个空格。
```

```javascript
// 规则5：不要省略句末的分号。
// eg:
x = y
(function() {
	...
})();
// =>
x = y(function() {...})();
```

```javascript
// 规则6：不要使用with语句。
// eg:
with(o) {
	foo = bar;
}
// =>
// o.foo = bar;
// o.foo = o.bar;
// foo = bar;
// foo = o.bar;
```

```javascript
// 规则7：不要使用"相等"（==）运算符，只使用"严格相等"（===）运算符。
// eg:
0 == '' // true
1 == true // true
2 == true // false
0 == '0' // true
false == 'false' // false
false == '0' // true
"\t\r\n" == 0 // true
```

```javascript
// 规则8：不要将不同目的的语句，合并成一行。
// eg:
var a = b = 0;
// =>
b = 0;
var a = b;
```

```
规则9：所有变量声明都放在函数的头部。
规则10：所有函数都在使用之前定义。
```

```
规则11：避免使用全局变量；如果不得不使用，用大写字母表示变量名。
```

```
规则12：不要使用new命令，改用Object.create()命令。
eg: 一旦忘记使用new对象内部this指针会指向全局对象
规则13：建构函数的函数名，采用首字母大写（InitialCap）；其他函数名，一律首字母小写。
```

```
规则14：不要使用自增（++）和自减（--）运算符，用+=和-=代替。
```

```javascript
// 规则15：总是使用大括号表示区块。
// eg:
if (a) b(); c();
// =>
if (a) {
	b();
}
c();
```

```
规则16：不要使用function语句
```

```
规则17：不使用contiune以及switch贯穿
```

### ECMAScript2015 编程风格

#### 1.块级作用域

使用`let`代替`var`

所有的函数都应该设置为常量

优先使用`const`并建议使用解构赋值

#### 2.字符串

静态字符串使用单引号`'foobar'`

动态字符串使用反引号```foo${a}bar` ``

#### 3.解构赋值

使用数组成员变量赋值时，优先使用解构赋值

```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

函数的参数如果时对象的成员，优先使用解构赋值，便于以后添加返回值或者改变返回值顺序

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
```

#### 4.对象

单行定义对象最后一个成员不以逗号结尾

多行定义对象最后一个成员以逗号结尾，Git提交会少一行记录

使用`Object.assign`添加新的属性

对象动态属性名使用属性表达式定义

对象的属性和方法尽量简写

```javascript
var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

#### 5.数组

使用扩展运算符(...)拷贝数组

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

使用Array.from方法，将类似数组的对象转为数组

```javascript
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

#### 6.函数

使用箭头函取代`Function.prototype.bind`，不再适用self/_this/that绑定`this`

使用箭头函数代替函数表达式

函数的配置项应该集中在一个对象，放在最后一个参数，布尔值不作为直接参数

不在函数体内使用arguments变量，使用rest(…)运算符代替

使用默认值语法设置函数参数的默认值

#### 7.Map结构

如果只是需要`key: value`的数据结构，使用Map结构，因为Map结构有内建的遍历机制

```javascript
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```

#### 8.Class

使用Class取代需要proyotype的操作

使用`extends`实现继承，这样不会有破坏`instanceof`的危险

#### 9.模块

如果模块默认输出一个对象，对象名的首字母应该大写

如果模块默认输出一个函数，函数名的首字母应该小写

不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）