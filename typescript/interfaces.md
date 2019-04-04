## Interfaces

### 定义

- 类似**鸭子类型**或者**结构体**
- 强制约束字段的数据类型
- 接口的检查器不会要求这些属性用什么顺序排列，只要求借口所需的属性存在且类型一致

### 可选属性

- 常应用于`option bags`模式
- 对可能存在的属性进行预定义
- 可以捕获引用了不存在的属性时的错误

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

### 只读属性

使用`readonly`指定属性只能在刚创建的时候修改其值

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
// 赋值后x与y不能再改变
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

使用`ReadonlyArray<T>`类型创建不可变数组

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
// 把整个ReadonlyArray赋值到一个普通数组也是不可以的
```

作为变量使用的话使用`const`，若为属性则使用`readonly`

### 额外的属性检查(?)

使用类型断言

```typescript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

添加字符串索引签名，当对象可能具有某些为特殊功能使用的额外属性

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

### 函数类型

#### 基本使用

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

#### 参数匹配

```typescript
// 函数参数名不需要与接口定义的名字相匹配
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
```

#### 参数推断

```typescript
// 可不指定函数的类型，由编译器推断参数类型
let mySearch: SearchFunc;
mySearch = function(src, sub) {
  let result = src.search(sub);
  return result > -1;
};
```

### 可索引类型

#### 定义

#### 只读索引签名

### 类类型

### 继承接口

### 混合类型

### 接口继承类
