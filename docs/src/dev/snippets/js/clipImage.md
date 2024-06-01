---
outline: [2, 3]
tags: JavaScript 代码片段 工具方法
publishDate: 2022/04/22
---

# <图片> 剪裁

```js
/**
 * @params {String} src 图片路径
 * @params {String} mode 图片剪裁方式，'default'：保证图片完全显示
 * @params {Number} maxWidth 容器最大宽度，单位px
 * @params {Number} maxHeight 容器最大高度，单位px
 * @returns {Object} result 包含剪裁后图片尺寸
 * @description 图片剪裁
 */

export async function imgClipper(src, maxWidth, maxHeight, mode = "default") {
  let height, width;
  let imgResolvePromise = new Promise((resolve) => {
    let img = new Image();
    img.src = src;
    img.onload = function () {
      resolve(img);
    };
  });
  let imgParams = await imgResolvePromise(src);
  let imgRatio = imgParams.width / imgParams.height;
  let containerRatio = maxWidth / maxHeight;

  if (mode === "default") {
    if (imgRatio < containerRatio) {
      height = maxHeight;
      width = maxHeight * imgRatio;
    } else {
      width = containerRatio;
      height = containerRatio / imgRatio;
    }
  }

  return {
    originHeight: imgParams.height,
    originWidth: imgParams.width,
    height,
    width,
  };
}
```
