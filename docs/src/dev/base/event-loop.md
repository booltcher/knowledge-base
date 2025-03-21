---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2020/05/26
---
# 事件循环

[HTML Standard](https://whatwg-cn.github.io/html/#task-queue)

[JS Visualizer 9000](https://www.jsv9000.app/)

## 为什么要有事件循环

- JS是单线程语言，因此在执行代码时不能同时执行多个任务
- 导致JavaScript在处理某些长时间运行的操作（如网络请求、文件系统访问等）时出现阻塞，从而影响用户体验
- 为了解决这些问题，JavaScript引入了**异步编程模型**和**事件循环机制**
- 避免了阻塞，提高了效率和并发性
- 所以事件循环是单线程语言的必然伴生物
- 它可以监听消息队列中的事件并根据优先级顺序依次执行相应的回调函数
- 它定义了如何处理不种类型任务的执行顺序

## 不同环境

我们常说的JS实际由JS Engine 和 JS Runtime两部分组成。

而Event Loop 属于 Runtime的范畴。

所以不同环境对事件循环有不同实现，主要就是浏览器和NodeJS。

<aside>
💡 JS Engine 与 JS Runtime
浏览器Runtime：window DOM
Node Runtime: process

</aside>

## 任务类型

- 同步任务
- 异步任务
    - 宏任务
        - script
        - setTimeout()
        - setIntervel()
        - setImmediate() ***NodeJS***
        - I/O操作
    - 微任务
        - process.nextTick ***NodeJS***
        - promise.then()
        - MutationObserver ***Browser***

## 浏览器事件循环

- 当 JavaScript 代码首次加载时，整个script脚本会作为一个宏任务放入执行栈中处理
- 同步任务依据调用关系依次进入执行栈(Call Stack)执行并弹出，直到执行栈为空
- 遇到异步任务，JS引擎会将其交由Web API处理
- 异步任务处理完(触发IO、请求响应、定时器到期)将回调放入队列(Queue)，宏任务回调进入Task Queue，微任务的回调进入MicroTask Queue
- 当执行栈为空时，开始执行微任务队列中的回调，在此过程产生的微任务一并处理
- 在微任务处理完成后，如果需要重新渲染浏览器会在这时进行重新渲染
- 渲染完成后再从宏任务队列中取出一个任务并执行
- 事件循环会不断重复上述步骤，直到所有任务都执行完毕。

## Node环境事件循环

[The Node.js Event Loop, Timers, and process.nextTick() | Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)

Node中事件循环是基于libuv引擎实现的。

```jsx
	 ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

- 定时器检测阶段(timers)：本阶段执行 timer 的回调，即 setTimeout、setInterval 里面的回调函数。
- I/O事件回调阶段(I/O callbacks)：执行延迟到下一个循环迭代的 I/O 回调，即上一轮循环中未被执行的一些I/O回调。
- 闲置阶段(idle, prepare)：仅系统内部使用。
- 轮询阶段(poll)：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
- 检查阶段(check)：setImmediate() 回调函数在这里执行
- 关闭事件回调阶段(close callback)：一些关闭的回调函数，如：socket.on('close', ...)

<aside>
🔎 参考阅读

[宏任务和微任务：不是所有的任务都是一个待遇 | 浏览器工作原理与实践](https://blog.poetries.top/browser-working-principle/guide/part4/lesson18.html#宏任务)

[](https://github.com/LuckyWinty/blog/blob/master/markdown/Q&A/事件循环机制满分答案.md)

</aside>