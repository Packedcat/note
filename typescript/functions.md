## Functions

#### 基础使用

```typescript
function add(x: number, y: number): number {
  return x + y;
}
let myAdd = function(x: number, y: number): number {
  return x + y;
};
```

#### 函数表达式完整的类型声明

```typescript
// 变量被赋予参数类型与返回值类型
let myAdd: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};
// 如果函数没有返回任何值也必须指定返回值类型为void而不能留空
```

#### 推断类型

```typescript
// myAdd 拥有完整的函数类型
let myAdd = function(x: number, y: number): number {
  return x + y;
};

// 函数的参数及返回值都有对应的类型
let myAdd: (baseValue: number, increment: number) => number = function(x, y) {
  return x + y;
};
```

#### 可选参数和默认参数

- 在`JavasCript`中所有参数均为可选参数，没有传参时为`undefined`
- 在`TypeScript`中参数名后面加`?`实现可选参数
- 默认参数若在前面若需要取默认值需要明确传入`undefined`

#### 剩余参数

使用扩展运算符`...`获得不定数量的参数数组

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

### 函数中关于 this 指向问题

#### 函数的`call`调用第一个参数为`this`

```javascript
function hello(thing) {
  console.log(this + ' says hello ' + thing);
}
hello.call('Yoite', 'world');
>>> 'Yoite says hello world'
```

#### 函数调用语句

```javascript
function hello(thing) {
  console.log("Hello " + thing);
}
hello("world");
// 等价于
hello.call(window, "world");
// 在严格模式下
hello("world");
// 等价于
hello.call(undefined, "world");
```

即：一个函数调用`fn(...args)`等价与`fn.call(window [ES5-strict: undefined], ...args)`

注：`(function() {})()`等价与`(function() {}).call(window [ES5-strict: undefined)`

#### 成员函数

函数的`this`不具备持久声明，而是在声明时传入

```javascript
function hello(thing) {
  console.log(this + " says hello " + thing);
}

person = { name: 'Yoite' };
person.hello = hello;

person.hello('world'); // 等价于person.hello.call(person, 'world')
>>> '[object Object] says hello world'

hello('world');
>>> '[object Window] says hello world'
```

#### 使用`Function.prototype.bind`

```javascript
var Person = {
  name: "Yoite",
  hello: function(thing) {
    console.info(this.name + " says hello " + thing);
  }
};

var bindHello = function(thing) {
  return Person.hello.call(Person, thing);
};

bindHello("world");

// 调整通用的调用
var bind = function(func, thisValue) {
  return function() {
    return func.apply(thisValue, arguments);
  };
};
var bindHello = bind(person.hello, person);
// 使用ES5语法
var bindHello = person.hello.bind(person);
```

### `this`

#### `this`和箭头函数

- 箭头函数能保存函数创建时的`this`值，而不是调用的值
- 若设置`--noImplicitThis`标记会指出没有明确返回类型的`this`为`any`类型

#### `this`参数

提供一个现实的`this`参数置于参数的最前面

```typescript
function f(this: void) {
  // 确定 `this` 在这个函数中不可用
}
```

#### `this`参数在回调函数里

将一个函数传递到某个库行函数里，当回调被调用时`this`为`undefined`

```typescript
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    this.info = e.message;
  }
}
let h = new Handler();
// 要求函数必须带有this: void
uiElement.addClickListener(h.onClickBad); // error!
```

虽然指定函数`this: void`检测合法但是不能用 this 指向内部

```typescript
class Handler {
  info: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };
}
```

### 重载

为同一个函数提供多个函数类型定义来进行函数重载

```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
// 并不是重载的一部分
function pickCard(x): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 }
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
