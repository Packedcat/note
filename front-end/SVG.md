##SVG 实例文件

`standalone`规定 svg 文件是否独立，或者含有对外部文件的引用

```xml
<!-- 引入外部的dtd文件 -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
```

`<svg></svg>`svg 闭合标签

- `width`规定设置文档的宽度
- `height`规定设置文档的高度
- `version`定义所使用的 svg 的版本
- `xmlns`定义 svg 的命名空间

##引入 HTML

`<embed>`允许使用脚本，然而任何规范中并没有 embed 标签

`<object>`不允许使用脚本

`<iframe>`中庸，可在大部分浏览器中工作

##形状

- `<rect>`矩形
- `<circle>`圆形
- `<ellipse>`椭圆
- `<line>`线
- `<polyline>`折线
- `<polygon>`多边形
- `<path>`路径
- `<filter>`滤镜

###style 属性

- `stroke-with`定义矩形边框的高度
- `fill`定义矩形的填充颜色
- `stroke`定义矩形边框的颜色
- `fill-opacity`定义矩形填充的透明度
- `stroke-opacity`定义矩形边框的透明度

####矩形

- `width`定义矩形的宽度
- `height`定义矩形的高度
- `x`定义矩形的左侧距离
- `y`定义矩形的顶端距离
- `rx`定义矩形的圆角
- `ry`定义矩形的圆角

####圆形

- `cx`定义圆点的 x 坐标
- `cy`定义圆点的 y 坐标
- `r`定义圆的半径

####椭圆

- `cx`定义圆点的 x 坐标
- `cy`定义圆点的 y 坐标
- `rx`定义水平半径
- `ry`定义垂直半径

####线条

- `x1`在 x 轴定义线条的开始
- `y1`在 y 轴定义线条的开始
- `x2`在 x 轴定义线条的结束
- `y2`在 y 轴定义线条的结束

####多边形

- `points`定义多边形每个角的 xy 坐标数组

####折线

- `points`定义折线顶点的 xy 坐标数组

####路径

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath

####滤镜

- `id`定义滤镜唯一的名称
- 滤镜标签必须嵌套在`<defs>`标签内

####滤镜类型

- feBlend
- feColorMatrix
- feComponentTransfer
- feComposite
- feConvolveMatrix
- feDiffuseLighting
- feDisplacementMap
- feFlood
- feGaussianBlur
- feImage
- feMerge
- feMorphology
- feOffset
- feSpecularLighting
- feTile
- feTurbulence
- feDistantLight
- fePointLight
- feSpotLight
  - `stdDeviation`定义模糊的程度
  - `in`定义了由整个图像创建效果
