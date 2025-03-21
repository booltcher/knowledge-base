---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2023/08/24
---
# 类型判断

## 不包含Null

```js
const is = (type, val) => ![, null].includes(val) && val.constructor === type;

is(Array, [1]); // true
is(ArrayBuffer, new ArrayBuffer()); // true
is(Map, new Map()); // true
is(RegExp, /./g); // true
is(Set, new Set()); // true
is(WeakMap, new WeakMap()); // true
is(WeakSet, new WeakSet()); // true
is(String, ''); // true
is(String, new String('')); // true
is(Number, 1); // true
is(Number, new Number(1)); // true
is(Boolean, true); // true
is(Boolean, new Boolean(true)); // true
```

## 包含Null
最全面的方法。

```jsx
function typeOf(obj) {
  let res = Object.prototype.toString.call(obj).split(' ')[1]
  return res.slice(0, -1).toLowerCase()
}

typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'
typeOf(null)      // 'null'
```

也可以使用高阶函数和柯里化封装一个公共方法

```js
//实现一个检测类型的公共接口
function isRealType(type) {
    return function(obj) {
        return {}.toString.call(obj) === `[object ${type}]`
    }
}
//柯里化
const isFunc = isRealType("Function")
const isRegExp = isRealType("RegExp")

console.log(isFunc(realType)); //true
console.log(isRegExp(/test/)); //true

```

## `instanceof`

- 右侧必须是对象
- 检查后者是否在前者的原型链上

```js
let a = new String('xxx')
console.log(a instanceof String)  //true
let b = 'xxx'
console.log(b instanceof String)  //false

```

```js
var newInstanceof = (left, right) => {
   let objProto = left.__proto__;
   while(objProto) {
      if (objProto === right.prototype) {
        return true;
      }
      objProto = objProto.__proto__;
   }
   return false;
}

```

## 判断Null

```js
function isNull(value) {
  return Object.prototype.toString.call(value) === `[object Null]`;
}

function isNull(value) {
  return !value && typeof value === "object"
}
```

## 判断空对象

两个思路：

1. 遍历keys，判断keys的数量是否为0，遍历keys的方法有很多，比如Object.keys()和for…in，Reflect.ownKeys()
2. 使用JSON序列化，判断stringify的结果是不是`{}`

**传统方式**

1. 使用 `Object.keys()`
2. `JSON.stringify(obj) === '{}';`
3. 使用for…in循环结合`obj.hasOwnProperty(key)`

**传统的方式对于使用`Symbol`作为`key`的对象判断错误，可以结合`getOwnPropertySymbols`方法**

```js
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
}

const obj = {};
const sym = Symbol('symbolKey');
obj[sym] = 'value';

console.log(isEmptyObject(obj)); // false
console.log(isEmptyObject({})); // true
```

**或者：**

```js
Reflect.ownKeys(obj).length === 0;
```

## 判断基本类型

### `typeof`

```js
typeof undefined === 'undefined';
typeof Symbol() === 'symbol';
typeof 42n === 'bigint';
typeof String('123') === 'String'

typeof null === 'object'
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
typeof Math === 'object'
typeof alert === 'object'
typeof console === 'object'

typeof function() {} === 'function';
typeof class C {} === 'function'
typeof Math.sin === 'function'
```

`typeof`的局限性：

- **`typeof null === "object"`** 🤦

> typeof null ==='object' 的起源，最早值以32位为单位进行存储，低位(1-3位)表示值的类型，而 null 是全部为0，所以会被识别为 object
> 
> 000: `object`. 数据是对象的引用。
> 111: `int`. 数据是31位有符号整数。
> 010: `double`. 数据是对双浮点数的引用。
> 100: `string`. 数据是对字符串的引用。
> 110: `boolean`. 数据是布尔值。
- **不能细分引用类型，全部都是`object`** 🤦

### `Array.isArray`
判断数组

## 总结：判断一个值的类型，比较全面的方法

1. 最准确的是使用`Object.prototype.toString.call()`，返回结果是一个字符串 `[object ${type}]`
2. 对于非`null`和`undefined`的值，可以使用`constructor`属性，判断值的这个属性是否为某个构造函数
3. 对于除了`null`之外的基本类型，可以使用`typeof`，对于`null`，可以用逻辑非和`typeof`组合
4. 数组有单独的类型方法，`Array.isArray()`
5. 空对象的判断有两个思路：
    1. 遍历keys，判断keys的数量是否为0，遍历keys的方法有很多，比如`Object.keys()`和`for…in`，`Reflect.ownKeys()`
    2. 使用JSON序列化，判断stringify的结果是不是一对花括号