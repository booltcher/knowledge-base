---
outline: [2, 3]
tags: JavaScript 代码段 工具方法
publishDate: 2022/04/22
---
# <文件> 获取类型

```js
const map = {
  "FFD8FFE0": "jpg",
  "89504E47": "png",
  "47494638": "gif",
  "52494646": "webp",
};

export function getFileRealType(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      try {
        let uint8Array = new Uint8Array(event.target.result);
        let headInfoArr = [...uint8Array.slice(0, 4)];
        let key = headInfoArr
        .map((item) => item.toString(16).toUpperCase().padStart(2, "0"))
        .join("");
        resolve(map[key]);
      } catch (e) {
        reject(e);
      }
    };
 	});
},
```

