## 笔刷工具技术方案

### 背景

绘画人员：常见自定义2-5种笔刷，大部分绘画软件支持笔刷，最理想的环境是导入自己的profile（需要了解PS/SAI等的笔刷标准以及调研技术方案能都接入）

实际工具目标群体：在愿景不能达到的情况最差的要求是满足几类常用的笔刷，未提供的情况几乎无法开展工作

### 目标

最低标准：支持产品需求提供的六种笔刷

做好标准：支持导入 .abr 文件，支持调整笔刷参数与保存预设

### 现状

项目情况

| 能力/实现             | 描述                                             | 备注 |
| --------------------- | ------------------------------------------------ | ---- |
| canvas 绘制           | 依托于 fabric 实现的 Frame 类                    |      |
| 工具与事件的交互/通讯 | EDA 类，实际上有一部份散落在React Effect中的事件 |      |
| 工具抽象与实现        | 由抽象类 BaseTool 派生，由 Toolbox 管理          |      |
| 与视图层的 glue       | 在 React Hook 中实例化 Frame、EDA 等             |      |
| 工具管理类            | 负责注册工具，转发                               |      |
|                       |                                                  |      |

实现疑惑：

1. Frame 需要与外界通讯并依赖了 EDA，但 EDA 不应该属于 Frame（同理 ToolBox 内的 Tool）
2. EDA 为不同域分配了对象，但如果本身域就隔离在不同的 package/module 中那各自在内部实例化并管理起来更重要
3. EDA 实际上最终是在业务侧实例化并同时管理不同域的事件流转，最终过宽
4. EDA 不止交互事件同时负责业务事件
5. 既然 core 内的内容是内聚的，更应该提供聚合类对其能力进行组合对外提供特性
6. 工具的交互事件由 fabric 提供并在 ToolBox 负责转发，有点绕圈，也不容易扩展其他解决方案

对 React 最佳实践的假设：

在 Hook 中 glue 各类能力，包装成视图可接受的 API，在界定组件范围使用时包装成 Context

后续规划假设：

- canvas 状态的抽离并提供状态 mutation API，支持异步
- 单独的渲染管线负责读取状态对 canvas rerender
- 视图状态与 canvas 状态分离
- 交互事件由 canvas 自己 handle
- 实现统一的能力入口
- 归一化渲染频率，避免事件过多出发导致的大量重绘制
- 将 interaction 与 display 的 canvas 逻辑抽象至管理/渲染层用
- Layer 由渲染/管理类来管理
- 单独的 event layer handle 用户交互（pointer）transform 为各种解决方案的坐标
- selection 不依赖 fabric 实现，

### 方案

##### 方案一：扩展 Fabric 笔刷

Fabric 已知笔刷:

- `CircleBrush` and `SprayBrush` ( a spray example )
- `PencilBrush` ( a classic pencil )
- `PatternBrush` ( a pencil brush filled up with a pattern )

扩展类并重写各 event handler，工具实现仅负责创建扩展的 Brush 实例

##### 方案二：集成 croquis

参考 fabric 的笔刷实现方案，在 contextTop 临时绘制内容，每次绘制结束后手动清除临时画布的内容并将绘制内容转移至当前 fabric.Canvas 实例中（通过 layer 实例）

##### 实现关联：

- 原始画布的空间变换✅
  - offset
  - scale
- 选区限制✅
  - Scene 区域限制（mask 非 clip）
  - selection 区域限制（clip）
- 历史记录关联✅
- 应用透明度/流量/尺寸属性✅
- 自定义光标✅

##### 关于 mask constraint

当前实现为绘制二值图并转为两级结构的轮廓边界点（使用 OpenCV findContours 函数 RETR_CCOMP 模式）

1. 创建 selection 时持久化所有的内外路径（未考虑新增减少选区的场景）
2. 在离屏 canvas 绘制 mask
3. fill 外轮廓
4. 使用 destination-out 模式 fill 内轮廓裁切外轮廓
5. 在绘制内容前绘制 mask，并将混合模式改为 source-in

### TODO

| 事项                                                      | ✅❌   | 备注                             |
| --------------------------------------------------------- | ---- | -------------------------------- |
| 认知：fabric 基础特性了解                                 | ✅    |                                  |
| 认知：layer 管理的逻辑                                    | ❌    |                                  |
| 优化：改用派生FabricObject存储绘制内容                    | ❌    | 后续有机会优化                   |
| 开发：绘制时应用裁切区域                                  | ✅    | 绘制mask应用source-in混合模式    |
| 开发：使用图案绘制笔刷                                    | ✅    |                                  |
| 开发：光标绘制笔刷图形状                                  | ✅    | 图片转边缘base64                 |
| 开发：绘制内容应用透明度与颜色                            | ✅    |                                  |
| 开发：绘制图案时应用流量                                  | ✅    |                                  |
| 开发：绘制硬笔触                                          | ✅    |                                  |
| Bug：在色彩空间不一致的屏幕上绘制添加到Fabric后颜色不一致 | ❌    | 可能与 canvas 的色彩空间设置有关 |

在fabric的canvas中add一个FabricImage对象，且原始的canvas已经有

### Reference

https://github.com/av01d/fabric-brushes

https://github.com/tennisonchan/fabric-brush

http://perfectionkills.com/exploring-canvas-drawing-techniques/

https://github.com/crosspop/Croquispop

https://github.com/fabricjs/fabric.js/issues/9465

https://developer.mozilla.org/en-US/docs/Web/API/ImageData/colorSpace