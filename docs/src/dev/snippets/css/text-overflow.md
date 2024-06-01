---
outline: [2, 3]
tags: UI 代码片段
publishDate: 2020/06/23
---

# 文本溢出

单行
```css
width: 200px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

多行
```css
word-break: break-all;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
```
