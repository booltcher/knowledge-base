---
outline: [2, 3]
tags: 
  - UI
  - 代码片段
publishDate: 2022/04/22
---

# 隐藏数字输入框按钮

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
```
