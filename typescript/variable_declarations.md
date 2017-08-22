## Variable Declarations

### 怪异的变量规则

```typescript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
>>> (10)10
```

上述循环因为执行完毕后内部函数获取了循环体的局部变量，此时的`i`的值为10

```typescript
for (var i = 0; i < 10; i++) {
    // IIFE并传入当前的i
    (function(x) {
        setTimeout(function() { console.log(x); }, 100 * x);
    })(i);
}
>>> 1~10
```

### 块级作用域

* 使用`let`代替`var`回避变量提升
* 拥有块级作用域
* 不能重声明，即便是参数

### 常量声明

* 同为块级作用域
* 不可重新赋值
* 若产量定义为可变对象，则指向不可变，属性可变


### 数组解构赋值

简化解构数据的赋值操作，实质为模式匹配

```typescript
let input = [1, 2];
let [first, second] = input;
// 等价于
first = input[0];
second = input[1];
// 解构赋值可省略声明关键词
[first, second] = input;
```

解构赋值作为函数的参数

```typescript
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f([1, 2]);
```

使用扩展运算符`...`将数组转为用逗号分隔的参数序列

```typescript
let [first, ...rest] = [1, 2, 3, 4];
// first 1
// rest [ 2, 3, 4 ]
```

可省略部分元素

```typescript
let [first] = [1, 2, 3, 4];
let [, second, , fourth] = [1, 2, 3, 4];
```

### 对象解构赋值

数组按索引赋值，对象按属性名赋值

```typescript
let o = {
    a: 'foo',
    b: 12,
    c: 'bar',
};
let { a, b } = o;
```

同数组一样可省略声明关键词，但由于JavaScript解析花括号为代码块所以需要环绕圆括号

```typescript
({ a, b } = { a: 'baz', b: 101 });
```

使用扩展运算符浅拷贝对象所有可遍历但尚未读取的属性

```typescript
let { a, ...passthrough } = o;
```

属性重命名

```typescript
let { a: newName1, b: newName2 } = o;
// 等同于
let newName1 = o.a;
let newName2 = o.b;
// 冒号不等同于表明类型，若需要则仍需要重新写
let { a, b }: { a: string, b: number } = o;
```

默认值

```typescript
// 用于避免属性未定义
function keepWholeObject(wholeObject: { a: string, b?:number }) {
    let { a, b = 1001 } = wholeObject;
}
// 即使b为undefined仍可以正常赋值
```

### 函数声明

