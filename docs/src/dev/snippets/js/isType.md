---
outline: [2, 3]
tags: 
  - JavaScript 
  - 代码片段 
  - 工具方法
publishDate: 2023/01/11
---

# 数据类型校验

```js
export const is = (type, val) =>
  ![, null].includes(val) && val.constructor === type;
```

## 示例

```js
is(Array, [1]); // true
is(ArrayBuffer, new ArrayBuffer()); // true
is(Map, new Map()); // true
is(RegExp, /./g); // true
is(Set, new Set()); // true
is(WeakMap, new WeakMap()); // true
is(WeakSet, new WeakSet()); // true
is(String, ""); // true
is(String, new String("")); // true
is(Number, 1); // true
is(Number, new Number(1)); // true
is(Boolean, true); // true
is(Boolean, new Boolean(true)); // true
```
