## TypeScript 在 monorepo 的应用

### 目的

明确在 monorepo 中如何边界清晰的使用 typescript 编写的模块

### 现状

##### 需要处理的问题有：

- 编辑器支持（类型提示，引入优化）
- 构建工具支持（模块依赖区分引用入口）
- linter 集成

##### 如何满足的需求

- 构建工具支持：resolve -> alias
- 编辑器支持：`declarationMap`
- linter

关联特性：

- paths
- references
- composite
- declarationMap

##### 对于编辑器支持

##### 对于构建工作支持

| 工具   | 依赖                      | 说明                                |
| ------ | ------------------------- | ----------------------------------- |
| vite   | -                         | 开箱即用，只转译不做类型检查        |
| rollup | @rollup/plugin-typescript | 可单独指定 tsconfig，类型检查可配置 |
|        |                           |                                     |

##### 对于 linter 与 formatter 支持

### Q&A

Q：声明文件的书写方式，声明文件如何被编辑器、构建工具、linter集成？

Q：declare namespace 与直接使用 namespace 有什么区别

A：declare 用于声明已有的全局命名空间，通常用于声明外部库的类型信息；单独的 namespace 用于模块化，现在多被 es module 取代

Q：`paths` 与 project references 的区别

A：`paths` 让代码中使用简洁的导入路径，`references` 让 TypeScript 按正确顺序构建各个子项目，提高编译效率

| 特性             | `paths`                                      | `references`                               |
| ---------------- | -------------------------------------------- | ------------------------------------------ |
| 作用             | 仅影响 TypeScript 的模块解析，不影响构建顺序 | 影响项目的构建顺序，适用于多包管理         |
| 依赖 `baseUrl`   | 是                                           | 否                                         |
| 依赖 `composite` | 否                                           | 是（必须开启 `composite: true`）           |
| 适用场景         | 方便模块导入时使用别名                       | 适用于 monorepo 或多个 TS 项目间的依赖管理 |
| 是否影响增量构建 | 否                                           | 是                                         |
| 是否控制编译顺序 | 否                                           | 是                                         |

Q：在不使用 tsc 作为构建工具的情况是否可以不声明 `references`

A：可以

Q：配置 paths 后影响什么

A：本质是 alias，如果使用其他构建工具需要配置其模块 resolve 的 alias 规则

### Reference

https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html

https://www.typescriptlang.org/docs/handbook/project-references.html



