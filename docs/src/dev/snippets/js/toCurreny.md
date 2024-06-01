---
outline: [2, 3]
tags: JavaScript 代码段 工具方法
publishDate: 2022/04/22
---

# 货币格式化

```js
export function toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: "currency",
    currency: curr,
  }).format(n);
```

🌰

```js
toCurrency(123456.789, "EUR"); // €123,456.79
toCurrency(123456.789, "USD", "en-us"); // $123,456.79
toCurrency(123456.789, "USD", "fa"); // ۱۲۳٬۴۵۶٫۷۹
toCurrency(322342436423.2435, "JPY"); // ¥322,342,436,423
```
