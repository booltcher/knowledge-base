---
outline: [2, 3]
tags: JavaScript 代码片段 工具方法
publishDate: 2022/04/22
---
# <日期> 间隔天数

::: tip
推荐使用库 
- 小巧简洁：[dayjs](https://dayjs.fenxianglu.cn/category/)
- 大而全：[moment.js](https://momentjs.devjs.cn/)
:::

```js
/**
 * @params {Date} dateInitial 初始日期
 * @params {Date} dateFinal 结束日期
 * @return result 相隔天数
 * @description 计算两个日期之间相差多少天
 */
export function daysBetweenDates(dateInitial, dateFinal) {
  return (newDate(dateFinal) - new Date(dateInitial)) / (1000 * 3600 * 24);
}
```

🌰
```js
daysBetweenDates('2019-01-01', '2019-10-14'); // 286
```
