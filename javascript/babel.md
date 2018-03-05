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