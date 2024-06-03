---
tags: 
  - JavaScript
  - 代码片段 
  - 设计模式
publishDate: 2024/03/21
---

# 手写发布订阅模式

```js
class EventEmitter {
  constructor() {
    // 存储事件和回调函数的映射关系
    this.eventMap = {};
  }

  on(type, handler) {
    if (!(handler instanceof Function)) {
      throw new Error("invalid handler type");
    }
    if (!this.eventMap[type]) {
      this.eventMap[type] = [];
    }
    this.eventMap[type].push(handler);
  }

  emit(type, params) {
    if (this.eventMap[type]) {
      this.eventMap[type].forEach((f) => f(params));
    }
  }

  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1);
    }
  }
}
```
