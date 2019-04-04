## **IIFE**(Immediately Invoked Function Expression)

在**JavaScript**中，圆括号`()`是一种运算符，跟在函数名后表调用该函数

`function`关键字可以解释为语句，也可以当作表达式

```javascript
// 语句
function f() {}
// 表达式
var f = function() {};
```

**JavaScript**引擎规定`function`关键字出现在行首则解释为语句，所以将其放在圆括号内让引擎解将其释为表达式

```javascript
(function() {
  /* code */
})();
// 或者
(function() {
  /* code */
})();
```

分号为必须，否则遇到两个连续的**IIFE**会将第二个解释为第一个的参数导致报错

```javascript
// 报错，第二行被解释为第一行的参数
(function() {
  /* code */
})()(
  (function() {
    /* code */
  })()
);
```

只要让解释器以表达式处理函数定义的方法都可以产生相同效果

```javascript
var i = (function() {
  return 10;
})();
true &&
  (function() {
    /* code */
  })();
0,
  (function() {
    /* code */
  })();
!(function() {
  /* code */
})();
~(function() {
  /* code */
})();
-(function() {
  /* code */
})();
+(function() {
  /* code */
})();
new function() {
  /* code */
}();
// 只有传递参数时，才需要最后那个圆括号
new function() {
  /* code */
}();
```

通常只对匿名函数使用**IIFE**，避免污染全局变量与封装外部无法读取的私有变量

```javascript
// 写法一
var tmp = newData; // 创建了一个全局变量
processData(tmp);
storeData(tmp);
// 写法二
(function() {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
})();
```

若需要全局对象需要传递参数

```javascript
void (function(global) {
  // 在这里，global就是全局对象了
})(this); // 在浏览器里，this就是window对象
```
