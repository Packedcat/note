## 表达式与语句

### 表达式（Expression）

表达式总有返回值，单值表达式返回结果为值本身，复合表达式返回结果为根据运算符进行运算的结果值

#### 单值表达式与复合表达式

* 单值表达式 - 不使用运算符的表达式
  * 基本表达式 - 不能再分解的表达式
  * 复杂表达式 - 需要其他表达式参与的表达式
* 复合表达式 - 由运算符将多个单值表达式结合而成的表达式

#### 基本表达式（Primary Expression）

原子表达式，无法再分解的表达式

* this、null、arguments等内置关键字
* 变量（variable） - 即已声明的标识符
* 字面量（literal） - 数字、布尔值、字符串、正则字面量
* 分组表达式 - 即圆括号，表示即刻进行计算

#### 复杂表达式

需要其他表达式参与

* 对象、数组的初始化表达式

  ```javascript
  {
    expression1: expression2, // ES5及以前，expression1只能使用字符串字面量
    [expression1]: expression2, // ES6支持返回值为字符串或Symbol类型的表达式作为属性名
  }
  [expression, expression, expression]
  ```
* 函数表达式（区分函数声明）

* 属性访问表达式

  ```javascript
  expression.identifier
  expression1[expression2]
  ```


* 调用表达式

  ```javascript
  // 方法调用
  expression0([[expression1[, expression2[, expression3]]])
  /* 方法调用模式 */
  var myobject = {
    value: 0,
    inc: function() {
      console.info(this.value);
    }
  }
  myobject.inc();
  // 函数调用
  expression0([expression1[, expression2[, expression3]]])
  /* 函数调用模式 */
  var add = function(a, b){
    return a + b;
  }
  var sum = add(3, 4);
  ```

* 对象创建表达式

  ```javascript
  new expression0([expression1[, expression2[, expression3]]])
  ```

### 语句（Statement）

表明执行过程的流程、限定和约定，形式上可以是单行语句，也可以是大括号括起来的复合语句

### 可省略分号的情况

* 一行的最后
* 整个代码文件的最后
* 在语法分隔符之前
* 复合语句的大括号之后

### 表达式语句

表示_只有表达式，没有其他语法元素的语句_

```javascript
1 + 2;
```

