## Visual formatting model

> The CSS *visual formatting model* is an algorithm that processes a document and displays it on visual media.
>
> CSS 视觉格式化模型是用来处理和在视觉媒体上显示文档时使用的计算规则
>
> CSS的可视化格式模型就是规定了浏览器在页面中如何处理文档树



盒子的生成

元素的 display 为 block、list-item 或 table 时被格式化为一个块

块级元素至少生成一个块级盒子（principal block-level box）

一个块级盒子可能也是一个块容器盒子

块容器盒子（block container box）要么只包含其它块级盒子，要么只包含行内盒子并同时创建一个行内格式化上下文（inline formatting context）

一个同时是块容器盒子的块级盒子称为块盒子（block box）



匿名块盒子

> 在某些情况下进行视觉格式化时，需要添加一些增补性的盒子，这些盒子不能用CSS选择符选中，因此称为匿名盒子（anonymous boxes）

匿名块盒子所有可继承的 CSS 属性值都为 inherit，所有不可继承的 CSS 属性值都为 initial

### 包含块（Containing Block）

> 元素会为它的子孙元素创建包含块，但是，并不是说元素的包含块就是它的父元素，元素的包含块与它的祖先元素的样式等有关系

- 根元素的包含块为初始包含块
- static 和 relative 的包含块由它最近的块级、单元格或者行内块祖先元素的内容框创建
- fixed 的包含块是当前可视窗口
- absolute 的包含块由它最近的 position 属性不为 static 的祖先元素创建
  - 如果其祖先元素是行内元素，则包含块取决于其祖先元素的 direction 特性
  - 如果祖先元素不是行内元素，那么包含块的区域应该是祖先元素的内边距边界

### 控制框（Controlling Box）



### IFC(Inline Formatting Context)

### BFC(Block Formatting Context)

### 概念

> 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

### 触发BFC

只要元素满足下面任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

### BFC 特性及应用

1. __元素处于同一个 BFC 内外边距会发生折叠__

将元素放在不同的 BFC 容器中避免外边距重叠

2. __BFC 可以包含浮动的元素__

触发容器的 BFC 使其包裹浮动元素

3. __BFC 可以阻止元素被浮动元素覆盖__

使用浮动与 BFC 实现两列自适应布局

### Reference

[10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)

[Visual formatting model](https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model)

[visuren](https://www.w3.org/TR/CSS2/visuren.html)

[CSS的可视化格式模型](https://www.kancloud.cn/xiaoyulive/system/598712)

[What’s the Deal with Margin Collapse?](https://jonathan-harrell.com/whats-the-deal-with-margin-collapse/)