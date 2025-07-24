## Fabric 探索解疑

### Overview

Fabric 是对 canvas  API 的高级封装，主要特性是对象管理，提供交互与基于对象的事件；有 StaticCanvas 不可交互与事件的静态画布与 Canvas 常规画布两种容器；除了常规的用户交互外还 handle 了对象的生命周期的事件，对外提供事件订阅

相比原生 Canvas 需要手动管理渲染，执行 clear 与 redraw，Fabric 有更丰富的绘制能力：

- renderAll/requestRenderAll 等高级 API
- 局部重绘
- 离屏缓存

#### Fabric 核心概念：

- Canvas
- Objects
- Patterns, Gradients and Shadows
- Image filters
- Interactions
- Selection
- Controls
- Drawing & Brushes
- Events
- Animations
- Exports
- JSON
- SVG

#### 特性支持：

- 支持利用 JSON 对内容进行序列化与反序列化
- 支持配置默认属性进行全局自定义
- 支持通过离屏预绘制以减少重复计算
- 支持通过 noScaleCache 减少交互过程的重复绘制
- 支持在非浏览器环境使用 Node.js 执行

### 设定

#### 事件

> **In general if you need to write code for something to happen** events from that something are unnecessary.

事件不是与应用程序的信息系统，是提醒你有些代码你还未实现

通常不需要事件，因为你自己知道这件事什么时候发生；在事件之前处理好事情而不是执行后通过事件再纠正

#### 缓存

缓存配置：

- perfLimitSizeTotal：可以启用缓存的最大像素量
- maxCacheSideLimit：可以启用缓存的最大边长
- minCacheSideLimit：可以启用缓存的最大尺寸

因为缓存最终是将离屏canvas 通过 `drawImage` 绘制到主 canvas 上，实际的性能消耗与 `fillRect` 等 API 相差不大，在绘制复杂的样式文字、大型 svg 或者组比较有用

> You can see that **50px are much faster than 130px** and this is because the 50px with retina scaling and 1.2 zoom is still under the minimum cache size of 256px, so the caches are cleaned but not resized. The 130px rect breaks at 260 with retina scaling and every subsequent zoom requires a canvas resize with a context lost and a new memory allocation. Of the 70+ms required around 30 are of garbage collecting. While no major GC event happens when the canvas aren’t resized.

超过 `minCacheSideLimit` 后性能消耗会上升，特别是缩放视口之类的操作会有较大影响

#### 对象模糊与抗锯齿

#### 变换（transformations）

### Q&A

#### Q：_cacheCanvas 与原生 Canvas API 的 OffscreenCanvas 有什么关系

_cacheCanvas 本质是一个不渲染的 HTMLCanvasElement，目的是减少重复计算

OffscreenCanvas 是在 Worker 中执行的渲染，目的是避免主线程卡顿

#### Q：大量事件导致的  requestRenderAll 会影响性能吗？

❌
