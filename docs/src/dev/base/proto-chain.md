---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2020/05/26
---
# 原型与原型链

- 每个构造函数都有一个**`prototype`**属性，它的值是一个对象，包含了所有可供该构造函数的实例共享的属性和方法。
- 使用构造函数新建实例时，实例的属性中会包含一个指针，指向构造函数的原型，可以使用`__proto__`或**`Object.getPrototypeOf()`**来获取它
- 当我们访问一个对象的属性时，如果对象内部不存在这个属性，就会去它的原型对象上找，而原型也有自己的原型，就这样找下去。
- 原型链的顶端是 `Object.prototype`, 它没有自己的原型，或者说它的原型是`null`
- `null`没有原型，它是原型链的末端

# 1.**实例的**`__proto__`**指向原型对象**

---

```jsx
function Person(name) {
    this.name = name
}
let obj1 = new Person(123)

console.log(obj1.__proto__ === Person.prototype)  //true

```

# **2.**`Person`**不是原型对象**`Person.prototype`**才是**

---

```jsx
console.log(obj1.__proto__ === Person)  //false
```

# **3. 构造函数**

---

- **函数有**`prototype`**属性，表示原型对象,这个对象有一个成员**`constructor`**就是构造函数本身;**
- **同时函数本身也是对象，它也是通过内置对象**`Function`**的构造方法生成的,所以函数作为对象也有**`__proto__`**,原型链指向**`Function`**原型，也就是**`Function.prototype`

```jsx
obj1.constructor === Person.prototype.constructor // true
console.log(Person.prototype.constructor === Person)   //true
console.log(Person.__proto__ === Function.prototype)  //true
console.log(Function.prototype.__proto__ === Object.prototype)  //true
```

# **4.内置Object对象的原型链指向**`null`

---

万物之根源,混沌

```jsx
console.log(Person.__proto__ === Function.prototype)  //true
console.log(Function.prototype.__proto__ === Object.prototype)  //true
console.log(Object.prototype.__proto__ === null) //true

```

# **5.所有可以**`new XXX`**的对象都是构造函数其**`__proto__` **指向**`Function.prototype`

---

```jsx
console.log(Function.__proto__ === Function.prototype)  //true
console.log(Array.__proto__ === Function.prototype)  //true
console.log(Object.__proto__ === Function.prototype)  //true

```

# **6.ES6的**`Class` **只是一个语法糖，**

---

内部实现原理还是通过构造函数生成对象，不过`Class`只能使用`new`关键字，不能当做普通函数执行。

```jsx
class Person{
    constructor(name){
        this.name = name
    }
}
let obj3 = new Person('bb');
console.log(obj3.__proto__ === Person.prototype)  //true
console.log(Person.prototype.constructor) //class Person ...

```

# **7.`Object.create(null)`生成的对象没有原型链**

---

```jsx
let obj2 = Object.create(null)
console.log(obj2.__proto__)  //undefined

```

# **8.**`Object.create(arg)`**、对象字面量和**`new Object()`**生成对象差异**

---

## `Object.create`

以一个现有对象作为原型，创建一个新对象

取决于参数

- 如果参数是`null`，生成的对象没有原型；
- 如果参数是对象，生成的对象原型链指向这个参数；

```jsx
let obj1 = {}
let obj2 = Object.create(obj1);
console.log(obj2.__proto__ === obj1);  //true
console.log(obj1.__proto__ === Object.prototype);  //true

```

## 字面量

和`new`创建其实没什么差别；`__proto__`指向 `Object.prototype`

```jsx
function Foo(name) {
  this.name = name;
}
var f = new Foo('nick')

f instanceof Foo // true
f instanceof Object // true

```

上述代码流程

1. f instanceof Foo： f 的隐式原型 **proto** 和 Foo.prototype ，是相等的，所以返回 true 。
2. f instanceof Object： f 的隐式原型 **proto** ，和 Object.prototype 不等，所以继续往上走。

f 的隐式原型 **proto** 指向 Foo.prototype ，所以继续用 Foo.prototype.**proto** 去对比 Object.prototype ，这会儿就相等了，因为 Foo.prototype 就是一个普通的对象。

## 手写：`Object.create()`

`Object.create()`就是通过原型链的方法创建一个对象

```jsx
Object.myCreate = function(proto, properties) {
    function F() {};
    F.prototype = proto;
    if(properties) {
        Object.defineProperties(F, properties);
    }
    return new F();
}
var hh = Object.myCreate({a: 11}, {mm: {value: 10}});
console.dir(hh);
```