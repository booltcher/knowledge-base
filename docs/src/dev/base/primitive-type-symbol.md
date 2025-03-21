---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2023/08/24
---
# `Symbol`
::: info
以往ES5的属性名都只能是String，这容易造成属性名的冲突。如果我们使用了他人提供的对象，并且想为其添加一些属性，新的名字就可能和之前的发生冲突。如果有一种机制可以保障每个属性名都是唯一的就能解决这个问题。
::: 

- 表示独一无二的值
- 基础类型
- 用`Sybmol()`函数生成
- 可以接受一个字符串参数，不过也只是为了便于标识
- 不能与其他类型的值进行运算
- 可以转为布尔值和字符串，但是不能转为数值

## descriptor

可以用来获取描述/标识。

```js
const sym = Symbol("foo");
sym.descriptor // "foo"
```

## 作为属性名

- 则永远不会重名发生冲突。
- 不可以使用`.` 获取值，只可以使用方括号
- 在对象内部使用时，也要加方括号
- 只有`Object.getOwnPropertySymbols()` 和 `Reflect.ownKeys()` 可以遍历它们，常规的遍历方法不行，所以可以用来定义一些内部的私有的属性

## 相同的值

如果想使用相同的Symbol值，可以使用`Symbol.for` 

```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

::: info
🔎 `Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("cat")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的 Symbol 值。
::: 

`Symbol.keyFor` 可以返回一个已登记的 Symbol 类型值的`key`。

## 内置的Symbol对象

有很多方法。

### `Symbol.iterator`

对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法。

对象进行`for...of`循环时，会调用`Symbol.iterator`方法，返回该对象的默认遍历器。

遍历器可以调用next方法

### `Symbol.toStringTag`

 定义`toString`返回的结果