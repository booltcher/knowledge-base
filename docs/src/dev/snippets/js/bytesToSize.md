---
outline: [2, 3]
tags: JavaScript 代码段 工具方法
publishDate: 2022/04/22
---

# <文件> 格式化尺寸

```js
/*
 * @params {Number} bytes 字节数
 * @return size 文件大小
 * @description 文件大小转换
 */
export function bytesToSize(bytes) {
  if (bytes === 0) return "0 B";
  var k = 1024;
  var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
}
```
