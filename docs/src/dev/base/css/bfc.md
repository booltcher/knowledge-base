---
outline: [2, 3]
tags: UI
publishDate: 2021/07/11
---

# BFC

> Block formatting context 块级格式化上下文

相互隔离的独立容器。

容器内的元素不会在布局上影响到外面的元素。

## 用途

- 清除浮动
- 不被浮动元素覆盖
- 阻止父子元素的 margin 折叠

## 如何创建

创建规则：

- 根元素
- 浮动元素（ float 不取值为 none）
- 定位元素（ position 取值为 absolute、fixed、sticky）
- display 取值为 inline-block，inline-flex，table-cell，table-caption
- overflow 取值不为 visible 的元素