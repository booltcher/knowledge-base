---
outline: [2, 3]
tags: 概念
publishDate: 2021/04/05
---

# 设计模式

设计原则并非是板上钉钉的教条，我们要根据实际情况去分析。

## 创建型：简单工厂模式

将创建对象的过程单独封装。

只需要传参进去就行，内部的逻辑不用关心。

```js
function User(name , age, career, work) {
    this.name = name
    this.age = age
    this.career = career
    this.work = work
}

function Factory(name, age, career) {
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码','写系分', '修Bug']
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...

    return new User(name, age, career, work)
}
```

## 创建型：抽象工厂模式

围绕一个超级工厂创建其他工厂。

```js
class newStarFactory extends MobilePhoneFactory {
  createOS() {
    // 操作系统实现代码
  }
  createHardWare() {
    // 硬件实现代码
  }
}
```

## 创建型：单例模式

其实 Vuex 不是严格的单例模式。

完全可以`new`多个实例，但是在 Vue 中实现了拦截创建的功能，实现了单例。而 Vuex 又只用于 Vue，所以我觉得也可以算作单例。

**不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例。**

往往都会有一段逻辑来拦截除首次外的创建行为：

```js
class SingleDog {
  show() {
    console.log("我是一个单例对象");
  }
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}

const s1 = SingleDog.getInstance();
const s2 = SingleDog.getInstance();

// true
s1 === s2;
```

也可以使用闭包实现：

```js
SingleDog.getInstance = (function () {
  // 定义自由变量instance，模拟私有变量
  let instance = null;
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new SingleDog();
    }
    return instance;
  };
})();
```

[手写单例模型](/src/dev/snippets/js/singleton)

## 创建型：原型模式

原型模式还是一种编程范式。是 JavaScript 面向系统实现的根基。JS 通过`Prototype`属性来继承原型上的方法和属性。

**利用实例来描述对象，用实例作为定义对象和继承的基础。**

## 结构型：装饰器模式

不会对原有的功能产生任何影响，仅仅是使其具备了一种新的能力。

`@`语法修饰一个类或者类的方法属性，本质就是一个函数，将被修饰者传入并赋予一些能力。

## 结构型：适配器模式

Axios 内部使用了适配器模式。

类似生活中的转接口，抹平=多种环境下 API 的调用差异。

## 结构型：代理模式

在某些情况下，出于种种考虑/限制，一个对象**不能直接访问**另一个对象，需要一个**第三者**（代理）牵线搭桥从而间接达到访问目的，这样的模式就是代理模式。

- ES6 Proxy
- 事件代理(委托)：如果一个`div`下有很多按钮，需要为每一个按钮绑定一个监听器，可以通过事件代理到父级的`div`上。
- 图片懒加载：其中 `new` 了一个虚拟的图片，不曾在 DOM 中出现，只是为了利用它去加载真实的图片，这里也是使用了代理。

## 行为型：策略模式

定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。

需求：商品有各种类型的价格，需要在不同情况下给出不同的价格。

```js
// 定义一个询价处理器对象
const priceProcessor = {
  pre(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },
  onSale(originPrice) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },
  back(originPrice) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },
  fresh(originPrice) {
    return originPrice * 0.5;
  },
};

// 询价函数
function askPrice(tag, originPrice) {
  return priceProcessor[tag](originPrice);
}
```

## 行为型：状态模式

允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

状态模式主要解决的是当控制一个对象状态的条件表达式过于复杂时的情况。把状态的判断逻辑转移到表示不同状态的一系列类中，可以把复杂的判断逻辑简化。

```js
class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
    // 初始化牛奶的存储量
    this.leftMilk = "500ml";
  }
  stateToProcessor = {
    that: this,
    american() {
      // 尝试在行为函数里拿到咖啡机实例的信息并输出
      console.log("咖啡机现在的牛奶存储量是:", this.that.leftMilk);
      console.log("我只吐黑咖啡");
    },
    latte() {
      this.american();
      console.log("加点奶");
    },
    vanillaLatte() {
      this.latte();
      console.log("再加香草糖浆");
    },
    mocha() {
      this.latte();
      console.log("再加巧克力");
    },
  };

  // 关注咖啡机状态切换函数
  changeState(state) {
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    }
    this.stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");
```

## 行为型：观察者模式

观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。

```js
// 定义发布者类
class Publisher {
  constructor() {
    this.observers = [];
    console.log("Publisher created");
  }
  // 增加订阅者
  add(observer) {
    console.log("Publisher.add invoked");
    this.observers.push(observer);
  }
  // 移除订阅者
  remove(observer) {
    console.log("Publisher.remove invoked");
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    });
  }
  // 通知所有订阅者
  notify() {
    console.log("Publisher.notify invoked");
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

// 定义订阅者类
class Observer {
  constructor() {
    console.log("Observer created");
  }

  update() {
    console.log("Observer.update invoked");
  }
}
```

:::info
**观察者模式与发布-订阅模式的区别是什么？**

**发布者直接触及到订阅者**的操作，叫观察者模式。

但如果韩梅梅没有拉群，而是把需求文档上传到了公司统一的需求平台上，需求平台感知到文件的变化、自动通知了每一位订阅了该文件的开发者，这种**发布者不直接触及到订阅者、而是由统一的第三方来完成实际的通信的操作，叫做发布-订阅模式**。

观察者模式和发布-订阅模式之间的区别，在于是否存在第三方、发布者能否直接感知订阅者。

发布-订阅模式松耦合性更强。
:::

## 行为型：迭代器模型

就是为了解决遍历问题。

- `JQuery`里的`$.each`
- ES6 新增的迭代器 `iterator`
