## Grid 布局

相比 flex，grid 是一种二维布局系统，同时控制行、列，类似表格布局，但更灵活

### 所有关联属性

#### 基础（容器）

- `display: grid | inline-grid`：启用 Grid 布局。`grid` 是块级，`inline-grid` 是行内级

- `grid-template-columns`：定义列宽，可以用像素、百分比、`fr` 单位等
- `grid-template-rows`：定义行高
- `grid-template-areas`：通过命名区域来布局
- `grid-template`：复合写法，综合定义行、列和区域

#### 自动生成属性（容器）

- `grid-auto-rows`：没有明确定义高度的行，自动行高是多少
- `grid-auto-columns`： 没有明确定义宽度的列，自动列宽是多少
- `grid-auto-flow`：控制自动放置时的方向：
  - `row`：（默认，先行后列）
  - `column`：（先列后行）
  - `dense`：（尽量紧凑，填补空隙）

#### 间距（容器）

- `row-gap`：行与行之间的间距
- `column-gap`：列与列之间的间距
- `gap`：复合写法，相当于 `row-gap + column-gap`

#### 对齐（容器）

- `justify-items`：控制每个单元格内的内容，水平方向对齐，可选：`start | end | center | stretch`

- `align-items`：控制每个单元格内的内容，垂直方向对齐，可选：`start | end | center | stretch`

- `place-items`：复合写法，相当于 `align-items` + `justify-items`
- `justify-content`：控制整个网格（整体）在容器水平方向上的位置，可选：`start | end | center | stretch | space-around | space-between | space-evenly`
- `align-content`：控制整个网格（整体）在容器垂直方向上的位置
- `place-content`：复合写法，相当于 `align-content` + `justify-content`

#### 放置位置（子项）

- `grid-column-start`：指定元素开始的列线
- `grid-column-end`：指定元素结束的列线
- `grid-row-start`：指定元素开始的行线
- `grid-row-end；`：指定元素结束的行线
- `grid-column`：复合写法，相当于 `grid-column-start / grid-column-end`
- `grid-row`：复合写法，相当于 `grid-row-start / grid-row-end`
- `grid-area`：四个值：`row-start / column-start / row-end / column-end`

#### 对齐（子项）

- `justify-self`：控制该元素在单元格内的水平对齐方式
- `align-self`：控制该元素在单元格内的垂直对齐方式
- `place-self`：复合写法，相当于 `align-self` + `justify-self`

### 基本使用

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三列，每列等分 */
  grid-template-rows: auto; /* 行高自动 */
}
```

### 行、列定义

```css
.grid-containe {
  grid-template-columns: 100px 200px auto;
  grid-template-rows: 50px 100px;
}
```

### 尺寸单位

- 固定单位

  - `px`：固定尺寸

  - `auto`：自动填充

  - `%`：相对于容器的百分比

  - `em`：相对字体大小

  - `rem`：相对根元素字体大小

  - `vh/vw`：相对视口的大小

  - `vmin/vmax`：相对与视口

- 弹性单位

  - `fr`（fraction）：剩余空间的比例

- 自动与内容关键字

  - `auto`：根据内容自动大小，或填充剩余空间
  - `max-content`：根据子元素内容的 **最长不可换行宽度** 来决定
  - `min-content`：根据子元素内容的 **最短可能宽度** 来决定
  - `fit-content()`：在 `min-content` 和设定的上限之间取值

- 函数
  - `repeat()`：用来重复模式
  - `minmax(min, max)`：定义一个范围，列或行会在这个范围内自适应
  - `subgrid`（相对新特性，部分浏览器支持）：允许子网格继承父网格的行列定义

### 对齐

```css
.grid-container {
  justify-items: center; /* 水平方向对齐方式 */
  align-items: center; /* 垂直方向对齐方式 */
}

.grid-container {
  justify-content: center; /* 整个网格整体水平对齐 */
  align-content: center; /* 整个网格整体垂直对齐 */
}
```

### Q&A

Q：`justify-items` 与 `justify-content` 有什么区别？

A：**`justify-items`**：控制 **单元格内部的内容** 在 **水平方向** 的对齐方式（作用于每个 **格子里的元素**）

**`justify-content`**：控制 **整个 grid 容器内部的网格整体** 在 **水平方向** 的对齐方式（作用于 **网格整体相对于容器** 的对齐）
