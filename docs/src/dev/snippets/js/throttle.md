---
outline: [2, 3]
tags: JavaScript 代码片段 工具方法
publishDate: 2022/04/22
---

# 节流

## 简版

```js
export function throttle(fun, time) {
  let t1 = 0; //初始时间
  return function () {
    let t2 = new Date(); //当前时间
    if (t2 - t1 > time) {
      fun.apply(this, arguments);
      t1 = t2;
    }
  };
}
```
## 完全体
```js
/*
 * @param {Function} func 函数
 * @param {Number} wait 延迟执行毫秒数
 * @param {Boolean} type true 表示时间戳版，false 表示定时器版
 * @description 节流:即使持续触发事件，没隔一段时间，只会执行一次事件。
 */
export function throttle(func, wait, type) {
  let previous;
  let timeout;
  if (type) {
    previous = 0;
  } else {
    timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type) {
      let now = Date.now();
      if (now - previous > wait) {
        typeof func === "function" && func.apply(context, args);
        previous = now;
      }
    } else {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          typeof func === "function" && func.apply(context, args);
        }, wait);
      }
    }
  };
}
```
