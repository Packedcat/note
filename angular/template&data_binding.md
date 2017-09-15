## 模板与数据绑定

### 显示数据

* 使用__插值表达式__显示组件属性`{{myProp}}`
* 使用反引号括起多行模板
* 在按键、定时器、HTTP请求等异步事件后更新视图
* `template/templateUrl`属性存放__内联模板__或模板文件
* 组件类属性变量赋值/构造函数初始化属性
* `ngFor`指令渲染可迭代数据到__迭代模板__
* 构造函数的__参数属性__定义数据类__类型化__数据
* `ngIf`指令条件渲染数据

### 模板语法

* Angular模板支持几乎所有的HTML语法
* `<script>`元素，它被禁用了，以阻止脚本注入攻击的风险
* `<html>`、`<body>`和`<base>`没有意义

#### 插值表达式(Interpolation)

插值表达式是一个特殊的语法，Angular 把它转换成了__属性绑定__

#### 模板表达式(Template expressions)

* 模板表达式会产生一个值，Angular负责把这个值赋值给绑定目标的属性
* 表达式中的上下文变量是由__模板变量__、指令的__上下文变量__（如果有）和组件的成员叠加而成的
* 变量优先级：模板变量>上下文变量>组件成员
* 模板表达式不能引用全局命名空间的任何东西
* 以下表达式被禁止：
  * 赋值(`=`,`+=`,`-=`,...)
  * `new`运算符
  * 使用`;`或者`,`的链式表达式
  * 自增或自减操作符(`++`或`--`)
* 不同与JavaScript语法：
  * 不支持为运算符`|`和`&`
  * 新增模板表达式运算符
* 表达式指南
  * 没有可见副作用 - 模板表达式除了目标属性的值以外，不应该改变应用的任何状态
  * 执行迅速 - 表达式应该快速结束，计算代价高时考虑缓存
  * 非常简单 - 复杂的业务逻辑应在组件实现
  * 幂等性 - 表达式应该总是返回完全相同的东西，直到某个依赖值发生改变

#### 模板语句(Template statements)

* 模板语句用来响应由绑定目标（如 HTML 元素、组件或指令）触发的事件
* 同模板表达式的上下文变量以及优先级
* 避免写复杂的模板语句，常规是函数调用或者属性赋值
* 不支持的JavaScript语法：
  * `new`运算符
  * 自增或自减操作符(`++`或`--`)
  * 操作并赋值，例如`+=`和`-=`
  * 位操作符`|`和`&`
  * 模板表达式运算符

#### 绑定语法

* 在括号中 (`[]`、`()`) 或是用前缀形式 (`bind-`、`on-`、`bindon-`) ，等号左边为目标名
* 在Angular中，attribute唯一的作用是用来初始化元素和指令的状态
* 进行数据绑定时，只是在与元素和指令的 property 和事件打交道


* 绑定的类型可以根据数据流的方向分成三类： 

```
# 单向从数据源到视图目标
{{expression}}
[target]="expression"
bind-target="expression"

# 单向从视图目标到数据源
(target)="statement"
on-target="statement"

# 双向
[(target)]="expression"
bindon-target="expression"
```

* 绑定目标


```html
<!-- 元素的property，组件的property，指令的property -->
<img [src]="heroImageUrl">
<hero-detail [hero]="currentHero"></hero-detail>
<div [ngClass]="{'special': isSpecial}"></div>

<!-- 元素的事件，组件的事件，指令的事件 -->
<button (click)="onSave()">Save</button>
<hero-detail (deleteRequest)="deleteHero()"></hero-detail>
<div (myClick)="clicked=$event" clickable>click me</div>

<!-- 事件与property -->
<input [(ngModel)]="name">

<!-- attribute -->
<button [attr.aria-label]="help">help</button>

<!-- class property -->
<div [class.special]="isSpecial">Special</div>

<!-- style property -->
<button [style.color]="isSpecial ? 'red' : 'green'">
```

#### 属性绑定

#### 事件绑定

#### 双向数据绑定

#### 内置指令

* 内置属性型指令
* 内置结构型指令

#### 模板应用变量

#### 输入输出属性

#### 模板表达式操作符

* 管道操作符
* 安全导航操作符
* 非空断言操作符

