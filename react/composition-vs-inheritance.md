## Composition vs Inheritance

> **Composition over inheritance**: 类应该通过它们的组合（通过包含实现所需功能的其他类的实例）来实现多态行为和代码重用，而不是继承自基础或父类

实际上业务使用中基本都是组合模式，继承也只是在扩展库的基类使用

- `React.Component` 类提供组件的抽象类
- 组件组合其实就是类组合

#### 依赖/关联/聚合/组合(Dependency/Association/Aggregation/Composition)

类继承（class inheritance）

```typescript
class A {}
class B {}
class C {}
// not supports mix yet
class CanAB extends mix(A, B) {}
class CanBC extends mix(B, C) {}
```

类组合（class composition）

```typescript
interface A {
  AFn: () => void
}
interface B {
  BFn: () => void
}
interface C {
  Cfn: () => boid
}
class CanAB {
  afn: A
  bfn: B
  constructor(a: A, b: B) {
    this.afn = a
    this.bfn = b
  }
}
class CanBC {
  bfn: B
  cfn: C
  constructor(b: B, c: C) {
    this.bfn = b
    this.cfn = c
  }
}
```

简单界面实现

```typescript
class Widget {
  constructor() {
    this.ui = new UI('ui/path')
  }
  adjust() {
    this.ui.adjust()
  }
  update() {
    this.ui.update()
  }
  show() {
    this.ui.draw()
  }
  hide() {
    this.ui.destory()
  }
  create() {
    this.ui.create()
  }
  destory() {
    this.hide()
  }
}
```

组件组合（component composition）

```tsx
function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />
}
```

高阶组件

```typescriptƒ
const EnhancedComponent = higherOrderComponent(WrappedComponent)
```
