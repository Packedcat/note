```javascript
// parameter ab. => param
// argument ab. => args
// attribute ab. => attr
// 闭包实现类的创建
var Closure = (function() {
    // 静态私有变量
    var staticVariable = 0;
    // 静态私有方法
    function() {};
    // 创建类
    var _closure = function() {
        // 私有变量
        var privateVariavle;
        // 私有方法
        function privateMethod() {};
        // 特权方法
        this.getParam = function() {};
        this.setParam = function() {};
        // 公有属性
        this.publicVariavle;
        // 公有方法
        this.publicMethod = function() {};
    };
    // 构建原型
    _closure.prototype = {
        // 静态公有属性
        variable: false,
        // 静态公有方法
        method: function() {}
    };
    // 返回类
    return _closure;
})();
// 创建对象的安全模式
var Class = function(argument) {
    if (this instanceof Class) {
        this.param = argument;
    } else {
        return new Class(argument);
    }
};
// 类的原型
Class.prototype = {
    // 共有属性
    variable: true,
    // 共有方法
    method: function() {}
};
// 模块化编程
var module = (function() {
    var _param = 0;
    var m1 = function() {};
    var m2 = function() {};
    return { m1: m1, m2: m2 };
})();
```

