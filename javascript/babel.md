## Babel

### 概念

babel 是一个 javascript 转译器，用于将 ECMAScriptxxxx 的代码转为ES5 的代码

### 使用

通过 `.babelrc` 文件或在 `package.json` 文件的 `babel` 选项中配置规则

#### env 选项

`env` 选项的值将从 `process.env.BABEL_ENV` 获取，如果没有的话，则获取 `process.env.NODE_ENV` 的值，它也无法获取时会设置为 `"development"` 

使用 `cross-env` 让命令跨平台工作

```shell
yarn add cross-env -D
```

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

#### .babelrc

存放于根目录用与设置转码规则和插件

```json
{
  "presets": [],
  "plugins": []
}
```

`presets `字段设定转码规则，根据需求安装相应的依赖并加入 `.babelrc`

`"modules": false,` 不转码模块引入

`"plugins": ["transform-runtime"]` 作用同 `babel-polyfill` 后者会污染全局环境，若是一个代码库可能导致在其他人的执行环境中出错

#### babel-node

执行 `babel-node` 可进入 __PEPL__ 环境测试 __ES6__ 代码

需要全局或项目安装 `babel-cli`

#### babel-register

`babel-register` 模块为 `require` 命令加上一个钩子

使用 `require` 加载 `.js`、`.jsx`、`.es` 和 `.es6` 后缀名的文件，会先用Babel进行转码

使用时，必须首先加载 `babel-register`

```javascript
require("babel-register");
require("./index.js");
```
由于是实时转码，所以只适合在开发环境使用

#### babel-core

对部分代码调用特定API进行转码

```javascript
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

#### babel-polyfill

__Babel__ 默认只转换新的 __JavaScript__ 语法（syntax），而不转换新的API

eg.

* Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象
* 一些定义在全局对象上的方法（比如`Object.assign`）

#### webpack配置babel

安装

```shell
npm install --save-dev babel-loader babel-core
```

配置

```javascript
module: {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
}
```
装载

```javascript
var Person = require("babel!./Person.js").default;
new Person();
```

创建`.babelrc`配置文件

```shell
npm install babel-preset-env --save-dev
```

```json
{
  "presets": ["env"]
}
```

### Plugins

#### Presets

- preset 包含了特定的一部分 plugin
- preset-stage-0 包含 preset-stage-1 并额外增加一些功能（以此类推）
- 每年每个 preset 只编译当年批准的内容。 而 `babel-preset-env` 相当于 es2015 ，es2016 ，es2017 及最新版本

#### Plugin/Preset 排序

- Plugin 会运行在 Preset 之前
- Plugin 会从第一个开始顺序执行
- Preset 的顺序则刚好相反(从最后一个逆序执行)

#### Plugin/Preset 选项

Plugin 和 Preset 均可以通过将名称和选项对象放置在同一个数组中来指定其选项

```json
// plugins
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}
// presets
{
  "presets": [
    ["es2015", {
      "loose": true,
      "modules": false
    }]
  ]
}
```

### Polyfill

#### 在应用中使用

提供 ES2015+ 的环境垫片使应用能运行：

- 内置对象：`Promise` or `WeakMap`
- 全局对象的静态方法：`Array.from` or `Object.assign`
- 全局对象的实例方法：`Array.prototype.includes`
- 生成器函数：`regenerator`

```shell
# install
yarn add babel-polyfill

# import before app entry
require("babel-polyfill");

# or
import "babel-polyfill";

# webpack
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

#### 在库/工具中使用？

`transform-runtime`

#### 部分引入？

`core-js`

### Runtime transform?

### Reference

[Plugins](http://babeljs.io/docs/plugins/)

[Polyfill](http://babeljs.io/docs/usage/polyfill/)

[Env preset](http://babeljs.io/docs/plugins/preset-env/)

[.babelrc](http://babeljs.io/docs/usage/babelrc/)