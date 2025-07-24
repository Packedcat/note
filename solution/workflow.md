## Workflow 方案预研

### 目标

基于节点编辑器和可交互图表

一期需求：

- 节点实现
  - 图片/画布
  - 参数配置节点
  - <del>混合生成节点</del>
  - 文本节点
- 缩放、平移、自适应
- 生图任务历史记录
- 快照同步
- 撤销/重做

### 技术方案

#### 基础能力方案

workflow 的本质是通过节点的创建与连接，聚合不同类型的数据结构至

核心功能主要是节点连接以及可视化，交互部分比如拖拽、连线、右键菜单等

##### 技术涉及：

- WebGL
- SVG
- Canvas

> 可视化与渲染可选 SVG 或者 Canvas，SVG 适合交互多的场景，因为 DOM 操作方便，但节点多时性能可能有问题。Canvas 性能更好，但处理交互更复杂，可能需要手动处理点击事件。WebGL 的话适合 3D 或大量节点，但学习曲线高。

##### 提供此类能力的库：

- [GoJS](https://gojs.net/latest/)：付费、基于 canvas
- [JointJS](https://www.jointjs.com/)：付费、基于 SVG
- [Rete.js](https://rete.js.org/#/)： 开源（MIT）、基于 SVG、28.7k star、最近提交一周内
- [xyflow](https://xyflow.com/)：开源（MIT）、基于 SVG、10.5k start、最近提交 8 月前
- [DrawFlow](https://jerosoler.github.io/Drawflow/)：开源（MIT），能力较基础

DrawFlow 仅提供基础节点编辑能力，很多常规需要的特性都需要再开发。

xyflow 定义自己为构建基于节点的编辑器可交互图表，视图层官方提供 React 以及 Svelte 的集成。pro 并不提供额外的特性库，而是提供解决方案样板代码以及更高优先级的 bug 响应。文档丰富以及更好的社区活跃度方便在业务中集成以及后续迭代，但能力提供相对基础。

Rete.js 定义自己构建视觉接口与工作流的框架，更多提供能力本身而不 care 视图使用的库或框架。订阅或捐款可以获得 pro 代码案例，并获得更高优先级的 bug 响应。更关注能力提供与数据流动，对于工作流能力提供比较完善，且已插件化，但文档比较单薄，社区相比不太活跃。

结论：不管选用 Rete.js 或者 xyflow 作为解决方案，都会遇到不同程度的挑战，import/export 以及 undo/redo 核心特性都需要较大程度的二次开发，当前需求更注重界面流程交互而不太在意复杂的数据流动，故考虑选用基于 xyflow 方案的 React Flow

##### 目前特性需求：

核心诉求：

- 节点自定义
- 节点操作（拖拽连接、删除连线等）
- 视图窗口平移、缩放
- 历史记录（撤销/重做）
- 快照（导入/导出）

附加题：

- 对齐系统（辅助线、自动吸附）
- 右键菜单
- 选区，组操作

#### 撤销/重做方案

##### 方案一：快照 store 实例

每个操作存储一份当前 store 的快照，随用户交互移动快照指针，实现简单，快照已序列化支持网络传输，但不够优雅；简单的实现可以基于 zustand + zundo 接管 ReactFlow 实例的所有状态，本质上仍然是对 store 的快照

关联 API：

- toObject
- setEdges
- setEdges
- setViewport

当前节点的诉求均能被状态完整表达，而后续解决方案的实现并不一定均可映射为 state，且会对步骤的宽度定义无法控制故不考虑该方案

##### 方案二：命令模式（基于事务）

方案设计：

使用受控模式的 ReactFlow，state 及其 mutation handler 不对外暴露，转而抽象为基于事务的命令，由 WorkflowManager 代理执行并记录

行为与状态闭环链路为：Handler -> Command -> WorkflowManager -> Zustand store -> ReactFlow

```sequence
Title: 命令执行链路
Caller -> WorkflowManager: command
WorkflowManager -> store: dispatch action
store -> ReactFlow: synchronizing state
```

关于组件可多实例化：

为了每个组件实例都有自己的 Zustand store 和自己的 WorkflowManager，互不干扰，需要将 store 的模块单例结构改造为可多实例的工厂结构

| 项目            | 实现修改                                            |
| --------------- | --------------------------------------------------- |
| store           | 改为导出工厂函数惰性实例化                          |
| WorkflowManager | 构造时依赖 store 实例                               |
| React Context   | 在 Provider 按照依赖创建 store/WorkflowManager 实例 |

调用方通过 `useContext` 获得 store 与 WorkflowManager 实例，并通过 `useStore` 使用 store 实例的内部状态

```typescript
const { store, manager } = useContext(context)
const items = useStore(store, (state) => state.items)
const cmd = new Command(payload)
manager.executeCommand(cmd)
```

##### 命令模式设计

操作抽象

```typescript
interface CommonTransaction {
  // what
  targetId: string
  // how
  metadata: { source: 'user' | 'remote' }
  // when
  timestamp: number
}
// 派生基础事务指定 data 类型与 type
type MoveTransaction = CommonTransaction & {
  type: 'move'
  data: XY
}
```

命令目前已实现：

- 节点
  - `add`：添加
  - `remove`：删除
  - `move`：移动
  - `param-update` `annotation-update`：更新（依据不同节点自定义更新事务）
- 边
  - `connect`：连接
  - `disconnect`：删除连接

#### 快照导出与恢复

参考撤销与重做方案一，因为是受控组件，使用 store 的可序列化状态导出导入即可

#### 画布文件新增原图保存方案

##### 现状：

1. 画布文件预览与快照预览依赖快照保存接口时传递的 preview 字段（base64）
2. 当前base64通过调用 fabric `toDataURL` 方法输出，同步操作会阻塞交互
3. 1 场景仅需缩略图，工作台需要使用原图

##### 方案：

- merge 接口修改 preview  字段为 sourceFile，并且类型修改为 File
- snapshot/info 接口返回信息新增 raw 字段存放原图大小 URL

#### MISC

| 内容                                                         | ✅❌   | 备注                                                 |
| ------------------------------------------------------------ | ---- | ---------------------------------------------------- |
| 外部与 ReactFlow 实例的行为交互                              | ✅    | 提交命令至 WorkflowManager，代理执行 store 的 action |
| 封装后如何对调用方提供实例接口                               | ✅    | useImperativeHandle forward ref                      |
| WorkflowManager 实例属性如何映射成状态提供给上下文           | ✅    | 同步至 store 提供                                    |
| 外部事件坐标如何映射成内部坐标                               | ✅    | screenToFlowPosition                                 |
| ReactFlow 状态如何提供给调用方同步                           | ✅    | 改用实例化一 store 注入根组件 context                |
| 由命令管理代理的行为会重复添加命令                           | ✅    | 非受控组件改用 stackCommand 仅记录历史记录           |
| 如何限制连接的节点类型                                       | ✅    | 设置节点 Handle 的 isValidConnection                 |
| 如何获得连接的节点信息                                       | ✅    | 组合 useNodeConnections/useNodesData                 |
| 因为节点信息由前端管理，创建画布画布文件后创建会有丢失的风险（快照未同步） | ✅    | 进入文件调用上下文提供的方法保存快照                 |
| 生图需要文件 ID，需要确认是主文件 ID 还是引用文件 ID         | ✅    | 无需关注 file ID                                     |
| 如何获得缩略图                                               | ✅    | 使用 html-to-image 的 toPng                          |
| 指针位置插入节点                                             | ✅    | onPaneClick                                          |
| 自定义节点获取 ReactFlow 状态                                | ❌    | 改用 useWorkflowStore 获取 zustand 的状态            |

### Reference

[initialize-state-with-props](https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md)



