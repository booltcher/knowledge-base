---
outline: [2, 3]
tags: UI 代码段
publishDate: 2022/04/22
---

# 滚动条样式

定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸
```css
 ::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}
```

定义滚动条的轨道颜色、内阴影及圆角
```css
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rosybrown;
  border-radius: 3px;
}
```

定义滑块颜色、内阴影及圆角
```css
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e8e8e8;
}
```

定义两端按钮的样式
```css
::-webkit-scrollbar-button {
  background-color: cyan;
}
```

定义右下角汇合处的样式
```css
::-webkit-scrollbar-corner {
  background: khaki;
}
```
