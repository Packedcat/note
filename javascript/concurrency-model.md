## 并发模型跟事件循环(Concurrency model and Event Loop)

### 运行时(Runtime)

##### 栈(Stack)

> 函数调用形成了一个栈帧

按函数调用的先后顺序入栈，函数返回时出栈

##### 堆(Heap)

> 对象被分配在一个堆中，即用以表示一大块非结构化的内存区域

##### 队列(Queue)

> If the stack is clear and there's something in the queue, push the first thing on the queue on to the stack

每次执行栈空了之后都会去队列中取第一个消息执行，队列中的消息都关联着一个用以处理这个消息的函数

### 事件循环(Event loop)

- 函数执行时不会被抢占
- 消息添加若没有关联函数消息会丢失
- 零延迟的回调需要排队

### 单线程理解

同步任务（synchronous）

异步任务（asynchronous）

执行栈（execution context stack & call stack）

任务队列（task queue）

### Event Loop of Node.js

To be continued

##### macrotasks:

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O
- UI rendering

##### microtasks:

- process.nextTick
- Promises
- Object.observe
- MutationObserver

### Caveats

##### 永不阻塞

处理异步通常通过事件和回调进行，除了`alert` 和同步 XHR

### Reference

[Help, I’m stuck in an event-loop.](https://vimeo.com/96425312)

[JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
