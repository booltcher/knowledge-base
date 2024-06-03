---
outline: [2, 3]
tags: 
  - JavaScript 
  - 代码片段 
  - 工具方法
publishDate: 2020/09/21
---
# <图片> 懒加载

```js
/**
 * @method lazyLoad
 * @param {NodeList} $imgList      图片元素集合
 * @param {number}   preloadHeight 预加载高度
 */
export function lazyLoad($imgList, preloadHeight = 1000) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 目标元素出现在 root 可视区，返回 true
          const $target = entry.target;
          const src = $target.getAttribute("lazyload");

          if (src) {
            $target.setAttribute("src", src); // 真正加载图片
          }
          observer.unobserve($target); // 解除观察
        }
      });
    },
    {
      rootMargin: `0px 0px ${preloadHeight}px 0px`,
    }
  );

  Array.prototype.forEach.call($imgList, ($item) => {
    if ($item.getAttribute("src")) return; // 过滤已经加载过的图片
    observer.observe($item); // 开始观察
  });
}
```

## 使用方法
1. 为图片元素设置 `lazyload` 属性

```html
<img lazyload="图片链接" alt="图片说明" />
```

2. 观察图片元素

```js
lazyLoad(document.querySelectorAll("[lazyload]"));
```
