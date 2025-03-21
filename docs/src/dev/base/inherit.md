---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2020/05/26
---
# 继承
不算ES6的语法糖，有**6**种方式。

## 原型链继承(继承方法)

让子类的原型指向父类的实例

```jsx
function Parent() {
    this.name = "Parent";
    this.colors = ["red", "blue", "green"]
}
Parent.prototype.sayHello = function() {
    console.log("Hello from " + this.name);
};

function Child() {}
// 将 Child 的原型指向 Parent 的实例
Child.prototype = new Parent();

const child1 = new Child();
child1.sayHello(); // 输出: Hello from Child

const child2 = new Child();
child2.colors.push("yellow")
	console.log(child1.colors) // 输出 ['red', 'blue', 'green', 'yellow']
```

**优点：可以复用父类的方法**

**缺点：**

1. **父类中的引用类型属性被所有子类共享，更改一个子类的引用属性，其他子类也会受影响**
2. **无法向父级构造函数传参**

## 构造函数继承(继承属性)

在子类的构造函数里调用父类的构造函数，并使用call或apply改this；又名经典继承和对象伪装。

```jsx
function Father(name) {
    this.name = name;
    this.colors = ["red", "green"]
}

Father.prototype.sayHello = function() {
    console.log("Hello from " + this.name);
};

function Son(name) {
    Father.call(this, name);//继承了Father,且向父类型传递参数
}
var instance1 = new Son("Tom");
instance1.colors.push("blue")
var instance2 = new Son("Jack");

instance1.sayHello()  //报错，instance1.sayHello is not a function
console.log(instance2.colors) // ['red', 'green'] 不受其他子实例的影响

```

**优点：**

1. 让实例的引用类型属性保持独立
2. 子类可以向父类构造函数传参

**缺点：**

1. 构造函数无法复用
2. 父类定义的方法不能被继承

## 组合继承(最常用的继承模式)

指的是将**原型链和盗用构造函数的**技术组合到一块，从而发挥两者之长的一种继承模式。

但它会调用两次父类的构造函数所以也不是最完美的。后面会说到一种对于它的优化。

```jsx
function Father(name) {
    this.name = name;
    this.colors = ["red", "green"]
}

Father.prototype.sayHello = function() {
    console.log("Hello from " + this.name);
};

function Son(name) {
	Father.call(this, name)  //继承实例属性
}
Son.prototype = new Father()  //继承实例方法
const son1 = new Son("Tom")
const son2 = new Son("Jack")
son1.sayHello()

```

## 原型式继承(浅复制)

基于一个现有对象创建新对象

优点：方便快捷，适合简单扩展的场景，不必兴师动众地创建构造函数

缺点：同原型链继承，如果修改引用类型属性，所有基于同一原型对象的实例都会受到影响；且不能向传参

```jsx
const parent = {
    name: "Parent",
    colors: ["red", "blue"],
    sayHello() {
        console.log("Hello from " + this.name);
    }
};

// 使用 Object.create 实现原型式继承
const child = Object.create(parent);
child.name = "Child";
child.sayHello(); // 输出: Hello from Child
```

## 寄生式继承

浅复制并增**加新的功能**，返回新的对象

```jsx
function create(o){
  function Fn() {}
  Fn.prototype = o;
  return new Fn();
}

function createAnother(original){
	var clone = create(original);//通过调用create函数创建一个新对象
	clone.sayHi = function(){//以某种方式来增强这个对象
		alert("hi");
	};
	return clone;//返回这个对象
}

```

## 寄生组合式继承(最理想的继承方式)

组合继承最大的问题就是无论什么情况下,都会调用两次父类构造函数: 一次是在创建子类型原型的时候, 另一次是在子类型构造函数内部. 寄生组合式继承就是为了降低调用父类构造函数的开销而出现的。

它实则等同于 **构造函数继承 + 寄生式继承**

它的核心思想是：

1. **使用构造函数继承**：在子类构造函数中调用父类构造函数，继承父类的实例属性。
2. **使用寄生式继承**：通过 `Object.create` 创建一个以父类原型为原型的新对象，并将其赋值给子类的原型，从而继承父类原型上的方法。

相比于组合式，不再让子类的原型指向父类的实例，而是指向父类原型所创建出来的对象。`Child.prototype = Object.create(Parent.prototype)` 并随后增强来添加自己的功能。

具体实现步骤：

1. 定义父类

```jsx
function Parent(name) {
    this.name = name;
    this.colors = ["red", "blue"];
}
Parent.prototype.sayHello = function() {
    console.log("Hello from " + this.name);
};
```

1. 定义子类

```jsx
function Child(name, age) {
    // 调用父类构造函数，继承实例属性
    Parent.call(this, name);
    this.age = age;
}
```

1. 使用寄生式继承继承父类原型方法

```jsx
// 创建一个以父类原型为原型的新对象，并将其赋值给子类的原型
Child.prototype = Object.create(Parent.prototype);
// 修复子类原型的构造函数指向
Child.prototype.constructor = Child;

```

1. 添加子类特有的方法

```jsx
Child.prototype.sayAge = function() {
    console.log(this.name + " is " + this.age + " years old");
};
```

或：

```jsx
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;

  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

```

# ES6继承

---

与寄生组合式继承很像

```jsx
class Father {
    constructor(name) {
        this.name = name;
    }
    hello() {
        console.log('hello ' + this.name);
    }
}
class Son extends Father {//类似于原型继承
    constructor() {
        super(...arguments)
        //super类似于call继承,在这里相当于把父类的constructor执行
        //并且让方法中的this是Son的实例，super当中传递的实参都是给Father的
    }
}
let son = new Son('Tom');
console.log(son);
son.hello()
```