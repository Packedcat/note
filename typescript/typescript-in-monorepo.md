## TypeScript 在 monorepo 的应用

### 目的

明确在 monorepo 中如何边界清晰的使用 typescript 编写的模块

### 现状

#### 需要处理的问题有：

- 编辑器支持（类型提示，引入优化）
- 构建工具支持（模块依赖区分引用入口）
- linter 集成

#### 如何满足的需求：

- 构建工具支持：resolve -> alias
- 编辑器支持：`declarationMap`
- linter

#### 关联特性：

- paths
- references
- composite
- declarationMap

#### 对于构建工作支持：

| 工具   | 依赖                      | 说明                                |
| ------ | ------------------------- | ----------------------------------- |
| vite   | -                         | 开箱即用，只转译不做类型检查        |
| rollup | @rollup/plugin-typescript | 可单独指定 tsconfig，类型检查可配置 |

### package 多入口配置

#### 需要考虑的问题：

- Node/bundler 如何找到正确入口（main/module/exports）
- TypeScript 如何找到 `.d.ts` 类型声明
- Svelte 如何通过 svelte 字段找到 `.svelte` 源码（供 HMR 和 tree-shaking）

#### 总共有多少个角色：

| 角色         | 说明                                 | 典型代表                              |
| ------------ | ------------------------------------ | ------------------------------------- |
| 运行时加载器 | 负责在运行时加载包的入口文件         | Node.js、Deno、浏览器（通过 bundler） |
| 构建工具     | 负责在构建阶段解析依赖并产出 bundle  | Vite、Rollup、Webpack、esbuild        |
| 类型系统     | 负责在开发/CI 阶段检查类型并提供提示 | TypeScript、VSCode（TS Server）       |
| 框架工具链   | 对源码有特殊处理逻辑的框架           | SvelteKit、Next.js、Vite Svelte 插件  |

#### `package.json` 文件配置字段作用归类

| 字段                | 服务角色                        | 用途                                        |
| ------------------- | ------------------------------- | ------------------------------------------- |
| `main`              | 运行时加载器（Node.js, CJS）    | CommonJS 入口                               |
| `module`            | 构建工具（旧标准 ESM）          | 让 bundler 优先用 ES Module 版本            |
| `types` / `typings` | 类型系统                        | 指定 `.d.ts` 类型声明入口                   |
| `exports`           | 运行时加载器 + 构建工具（现代） | 精确指定 import/require/types/svelte 的路径 |
| `svelte`            | 框架工具链（Svelte/Vite）       | 指定 Svelte 源码入口（供热更新/编译）       |
| `files`             | npm 发布流程                    | 指定发布时包含哪些文件                      |
| `type`              | 运行时加载器 + 打包工具         | 指定模块类型（`module`/`commonjs`）         |

#### tsconfig 文件配置字段作用归类

| 字段                                 | 服务角色                                | 用途                                 |
| ------------------------------------ | --------------------------------------- | ------------------------------------ |
| `compilerOptions.paths`              | 类型系统 + 打包工具（TS-aware bundler） | 在 monorepo 内映射包名到源码路径     |
| `compilerOptions.types`              | 类型系统                                | 加载额外的全局类型定义               |
| `compilerOptions.composite`          | 类型系统（Project References）          | 启用增量编译，允许被其他 TS 项目引用 |
| `compilerOptions.outDir` / `rootDir` | 类型系统 + 构建脚本                     | 控制编译产物输出结构                 |
| `references`                         | 类型系统（Project References）          | 声明依赖关系，确保检查顺序           |
| `include` / `exclude`                | 类型系统                                | 控制哪些文件参与类型检查             |

#### 一个 package 的常见结构

```shell
packages/ui/
├── package.json
├── src/
│   ├── Button.svelte
│   └── index.ts
├── dist/                # 构建产物
│   ├── index.js
│   ├── index.mjs
│   └── index.d.ts
└── tsconfig.json
```

#### 一个 `package.json` 的常见例子

```json
{
  "name": "@my-scope/ui",
  "version": "0.1.0",
  "type": "module",

  // 发布后 CommonJS/ESM 的入口
  "main": "./dist/index.js",        // CommonJS fallback
  "module": "./dist/index.mjs",     // 旧工具的 ESM
  "types": "./dist/index.d.ts",     // TypeScript 类型

  // Svelte 工具链入口（Vite / Rollup / SvelteKit）
  "svelte": "./src/index.ts",

  // Node 16+ / Bun / ESM-aware bundler 使用
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "svelte": "./src/index.ts"
    }
  },

  // 仅发布构建产物
  "files": ["dist", "src"],

  // 方便 monorepo 内部直接 import 源文件
  "dev": {
    "link:src": "./src/index.ts"
  }
}
```

在项目生命周期中，不同角色如何找到代码

monorepo 内部开发时：

- `tsconfig.compilerOptions.paths` → 类型系统直接指向源码
- `package.json.svelte` → SvelteKit/Vite 在 HMR 时用源码
- （此时 `main/module` 等对内部引用没用）

发布到 npm 后：

- `main/module/exports` → 外部 Node.js / bundler 加载构建产物
- `types` → 外部 TypeScript 使用构建产物的类型声明
- `svelte` → 外部 Svelte 项目仍可按需编译 `.svelte` 源码（可选）

总结：`package.json` 字段主要服务运行时加载器、构建工具、框架工具链，`tsconfig` 字段主要服务 TypeScript 类型系统

### 多编译上下文冲突解决

typescript 在项目的各个生命周期会有以下繁琐问题：

1. 多来源配置冲突
   - 框架工具自带
   - Node 与 Browser 运行环境
   - 项目默认通用规则
2. 多用途 tsconfig
   - 框架构建工具作开发与构建
   - IDE 类型检查工具作全局类型提示/检查
   - CLI 工具作自动化，CI

解决决策思路：

1. package 保留自己的 tsconfig
2. 对不同用途的派生一个特定用途的 tsconfig

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



