---
outline: [2, 3]
tags: 
  - JavaScript 
  - 代码片段 
  - 工具方法
publishDate: 2022/04/22
---

# 深冻结

```js
/*
 * @params {Object} source 源数据
 * @return result
 * @description 对象深冻结
 */
export function deepFreeze(source) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = source[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(source);
}
```
