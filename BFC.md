## BFC(Block Formatting Contexts)

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
