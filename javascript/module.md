## 模块

模块就是实现特定功能的一组方法，只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

### 模块的对象写法

```javascript
// 暴露内部成员，内部状态可被改写
var module = new Object({
  _count: 0,
  m1: function() {
    //...
  },
  m2: function() {
    //...
  }
});
```

### 立即执行函数写法

```javascript
var module = (function() {
  var _count = 0;
  var m1 = function() {
    //...
  };
  var m2 = function() {
    //...
  };
  return {
    m1: m1,
    m2: m2
  };
})();
```

#### 放大模式

```javascript
// 模块需要划分或者模块需要继承的时候
var module1 = (function(mod) {
  mod.m3 = function() {
    //...
  };
  return mod;
})(module1 || {});
// 为module1添加新的方法，然后返回新的module1模块

// 模块内部不与程序的其他部分直接交互
// 为了调用全局变量或其他模块，应显示传入变量
var module1 = (function($, YAHOO) {
  //...
})(jQuery, YAHOO);
```

## 模块的规范

### CommonJS

```javascript
// 同步代码在浏览器端会等待造成假死
var math = require("math");
math.add(2, 3);
```

### AMD(Asynchronous Module Definition)

```javascript
// 所有依赖加载完成后调用回调函数
// 实现require.js
require(["math"], function(math) {
  math.add(2, 3);
});
```

### CMD(Common Module Definition)

```javascript
define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
});
```

### UMD(Universal Module Definition)

```javascript
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery", "underscore"], factory);
  } else if (typeof exports === "object") {
    // Node, CommonJS之类的
    module.exports = factory(require("jquery"), require("underscore"));
  } else {
    // 浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery, root._);
  }
})(this, function($, _) {
  //    方法
  function a() {} //    私有方法，因为它没被返回 (见下面)
  function b() {} //    公共方法，因为被返回了
  function c() {} //    公共方法，因为被返回了

  //    暴露公共方法
  return {
    b: b,
    c: c
  };
});
```

### ES6 Modules

#### Value Export/Import

支持导出/导入没有全局命名空间污染的模块/值。

```javascript
//  lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;

//  someApp.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));

//  otherApp.js
import { sum, pi } from "lib/math";
console.log("2π = " + sum(pi, pi));
```

#### Default & Wildcard

输出默认值与通配符

```javascript
//  lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default x => Math.exp(x);

//  someApp.js
import exp, { pi, e } from "lib/mathplusplus";
console.log("e^{π} = " + exp(pi));
```

### Tips

- **Node.js**采用了**CommonJS**的模块规范（`module.exports`、`exports`、`require`）

- **ES6**模块语法（`export`、`export default`、`import`）

- **CommonJS**加载某个模块，其实是加载该模块的`module.exports`属性

- `exports`变量是指向`module.exports`，相当于`var exports = module.exports`

- `require`只能引用`module.exports`这个对象，无法引用`exports`

- 不能直接将`exports`变量指向一个值

- `import`由`export default`语句输出的变量，语句不需要使用大括号

- `export default`只能使用一次

- `export m`直接输出变量实则输出变量的值，导致报错

- **Node.js**的`module`对象

  ```javascript
  // 准备module对象:
  var module = {
    id: "hello",
    exports: {}
  };
  var exports = module.exports;
  var load = function(module) {
    // 读取的hello.js代码:
    function greet(name) {
      console.log("Hello, " + name + "!");
    }

    module.exports = greet;
    // hello.js代码结束
    return module.exports;
  };
  var exported = load(module);
  // 保存module:
  save(module, exported);
  ```

### Vue 文件使用 webpack 打包

**webpack**打包时支持**CommonJS**、**AMD** 和**ES6**的模块化系统

通常写`.vue`单文件组件时，在`script`语言块中使用的是**ES6**的语法，使用`export default`进行默认导出

`require`语句是**CommonJS**的模块导入方式，不支持模块的默认导出，因此导入的结果其实是一个含`default`属性的对象，因此需要使用`.default`来获取实际的组件选项
