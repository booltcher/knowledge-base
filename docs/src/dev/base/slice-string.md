---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2020/05/26
---
# 截取字符串

# 同

---

- 第一个参数是起点，第二个参数是终点
- 如果参数是`NaN`，当做`0`处理

# 异

---

## 负数参数时

- `slice` 可以接受，表示从末尾开始数
- `substring` 当做 `0`
- 数组也有个`slice`方法

## 终点小于起点时

- `slice` 返回空字符串
- `substring` 会默认调整两个参数的顺序

# subStr

- 第二个参数表示长度
- 已被废弃