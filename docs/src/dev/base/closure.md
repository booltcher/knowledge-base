---
outline: [2, 3]
tags: 
  - JavaScript
publishDate: 2020/05/26
---
# 闭包

一个函数能访问外部的变量，或者说一个函数有权访问另一个函数作用域中的变量，这个函数就是一个闭包。

每个闭包都可以创建一个独立的环境，每次外部函数执行的时候，都会重新创建一个新的地址。

示例1：

```jsx
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}

var baz = foo();
baz(); // 2
```

另一个示例2：🌰

```jsx
function foo() {
  var a = 2;

  function baz() {
    console.log(a); // 2
  }

  bar(baz);
}

function bar(fn) {
  fn(); // bar可以访问到foo的内部作用域
}
foo();
```

再来一个示例3：🌰

```jsx
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}

wait("Hello, closure!");
// wait 函数已经执行完毕，但是它的作用域并不会被清除，因为timer还保留其message的引用。这也就是常说的内存泄露，需要卸载定时器。
```

**所以其实将函数当做第一公民到处传递时，就应用了闭包。**

**比如：定时器、事件监听器、Ajax请求、跨窗口通信、Web Workers或者其他的异步或同步任务中，只要使用了回调函数，就是在使用闭包。**

## 作用

可以在内存中维护一个函数私有的变量和方法而不被回收。

通常一个函数被调用后，浏览器引擎的垃圾回收器应该清理函数的内部作用域来释放不再使用的内存空间，而闭包阻止了这种清理，因为有闭包在使用另一个函数的作用域。

## 缺点

可能会导致内存泄露(大量常驻内存和无效内存)。

[内存泄漏](https://www.notion.so/c3d8f5dccc674de698ed94e0e1374bdb?pvs=21) 

内存泄露：使用完内存没有释放，导致内存空间浪费。通俗说法就是有人占着茅坑不拉屎。

内存溢出：申请内存时，没有足够内存空间了，通俗说法就是去蹲坑发现坑位满了。

### 经典笔试题

改写以修复：

```jsx
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  })
}

// 3
// 3
// 3
```

答：

```jsx
for (var i = 0; i < 3; i++) {
	(function (j) {
		setTimeout(() => {
			console.log(j)
		}, 0)
	})(i)
}

for (var i = 0; i < 3; i++) {
	setTimeout((num) => {
			console.log(num)
		}, 0, i)
}

for (let i = 0; i < 3; i++) { // 也体现了块作用域的nb！
	setTimeout(() => {
			console.log(i)
		}, 0)
}
```