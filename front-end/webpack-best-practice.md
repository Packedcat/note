## webpack best practice

### Started

install

```bash
npm install --save-dev webpack
```

start script

```json
"scripts": {
  "start": "webpack --config webpack.config.js"
}
```

package command

```shell
./node_modules/.bin/webpack src/index.js dist/bundle.js
```

using a configuration

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

use `npm script` replace `./node_modules/.bin/webpack`

### Asset Management

loading css

```shell
npm install --save-dev style-loader css-loader
```

loader

```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ];
}
```

> `import './style.css'` 会在运行时，将含有 CSS 字符串的 `<style>` 标签插入到 `html` 文件的 `<head>` 标签中

loading image

```shell
npm install --save-dev file-loader
```

loader

```javascript
{
  test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader'
    ]
}
```

`import MyImage from './my-image.png'` 和 `url('./my-image.png')` 会使用类似的过程去处理图片，将其添加到 `output` 目录，并替换为输出路径中图像的最终路径

### Output Management

setting up HtmlWebpackPlugin

```shell
npm install --save-dev html-webpack-plugin
```

plugins

```Java
plugins: [
  new HtmlWebpackPlugin({
    title: 'Output Management'
  })
],
```

### Development

source-map

```javascript
devtool: 'inline-source-map',
```

automatically compile

1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

#### Watch Mode

```Json
"watch": "webpack --watch",
```

#### webpack-dev-server

```Shell
npm install --save-dev webpack-dev-server
```
