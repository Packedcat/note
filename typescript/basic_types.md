## Basic Types

### Boolean

```typescript
let isDone: boolean = false;
```

### Number

```typescript
let decimal: numer = 6;
let hex: number = 0x00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### String

```typescript
let fullName: string = 'Cirno';
let age: number = 9;
let sentence: string = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`;
```

### Array

```typescript
let list: number[] = [1, 2, 3];
// or
let list: Array<number> = [1, 2, 3];
```

### Tuple

固定索引固定类型，且有顺序限制

```typescript
let x: [string, number];
// 通过
x = ['hello', 10];
// 初始化失败
x = [10, 'hello'];
```

访问索引外的元素使用联合类型

```typescript
x[3] = 'world'; // OK, 'string' can be assigned to 'string | number'
console.log(x[5].toString()); // OK, 'string' and 'number' both have 'toString'
x[6] = true; // Error, 'boolean' isn't 'string | number'
```

### Enum

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green; // 1
// 可为第一个元素重新设置索引开始值
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green; // 2
// 全部指定值
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green; // 2
```

方便的反向映射获取枚举变量的名称

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]; // 'Green'
```
### Any

可随意赋值任意类型，常用于接受第三方插件的回调数据

```typescript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

声明没有类型限制的数组

```typescript
let list: any[] = [1, true, 'free'];
list[1] = 100;
```

### Void

类似any，不是任何类型，常见于不返回值的函数

```typescript
function warnUser(): void {
    alert("This is my warning message");
}
```

声明一个void类型是无效的，因为只能赋值为`null`或者`undefied`

```typescript
let unusable: void = undefined;
```

### Null and Undefined

仅能赋值为各自对应的类型

```typescript
let u: undefined = undefined;
let n: null = null;
```

