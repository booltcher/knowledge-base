---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2020/05/26
---
# `<script>`的加载方式

## 默认同步

渲染引擎遇到`<script>`标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须有下载的时间。

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应，因为这时候渲染引擎停止工作了，由JS引擎工作。

## 异步加载

1. 渲染完再执行：`defer`要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行。如果有多个`defer`脚本，会按照它们在页面出现的顺序加载。

```jsx
<script src="path/to/myModule.js" defer></script>
```

1. 下载完就执行：一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。多个`async`脚本是不能保证加载顺序的。

```jsx
<script src="path/to/myModule.js" async></script>
```

1. ES6模块：浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的`defer`属性。

```jsx
<script type="module" src="./foo.js"></script>
```