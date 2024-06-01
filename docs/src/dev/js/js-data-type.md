---
outline: [2, 3]
tags: Vue
publishDate: 2023/08/24
---

# 数据类型

## 基本类型

- 原始类型，值类型
- 存储的是值
- 7种
- `null` `undefined` `string` `number` `boolean` `bigInt` `symbol`

### Number

[Number](https://www.notion.so/Number-55b28d16e2eb40de88dd9016eb74803a?pvs=21)

### String

```js
String.fromCharCode(97); // a
String.fromCodePoint(97); // a 但是与fromCharCode有所不同

"a".charCodeAt(); // 97
"abc".codePointAt(0); // 97 与charCodeAt在大部分场景可以互换
```

### Symbol

[`Symbol`](https://www.notion.so/Symbol-ea8072633c344b0bb3c6e5b97550b204?pvs=21) 

### BigInt

> JavaScript的`number`都保存成64位浮点数，因此有两大限制：
**1.** (数值精度只能到53 个二进制位，即16个十进制位)，使得JavaScript不适合进行科学和金融方面的精确计算。
**2.** 大于等于2**1024的数值会被当做Infinity
> 
- 表示整数，没有位数限制
- 为了与`Number`区分，`BigInit`类型数据要加`n`后缀 `1234n`
- `typeof 1234n === "bigint"`
- `1234n ≠ 1234`

## 对象类型

- 引用类型
- 存储的是地址
- 值存在堆里
- `Object` `Function` `Array` `Date` `Math` `RegExp` `Map` `Set`