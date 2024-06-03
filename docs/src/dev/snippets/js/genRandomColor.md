---
outline: [2, 3]
tags: 
  - JavaScript 
  - 代码片段 
  - 工具方法
publishDate: 2022/04/22
---

# 生成随机颜色

## Hex

```js
export function genRandomHexColorCode() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}
```

## RGB

```js
/*
 * @return result 颜色代码
 * @description 生成随机颜色代码
 */
export function genRandomColorRgb() {
  //rgb颜色随机
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = "(" + r + "," + g + "," + b + ")";
  return rgb;
}
```
