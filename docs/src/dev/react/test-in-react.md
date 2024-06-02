---
outline: [2, 3]
tags: React Test Jest
publishDate: 2021/08/15
---

# React 中的测试

## React-Testing-Library

```typescript
// example
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Counter from "./app";

describe("<Counter />", () => {
  it("properly increments the counter", () => {
    // Arrange
    const { getByText } = render(<Counter />);
    const counter = getByText("0");
    const incrementButton = getByText("+");
    const decrementButton = getByText("-");

    // Act
    fireEvent.click(incrementButton);
    // Assert
    expect(counter.textContent).toEqual("1");

    // Act
    fireEvent.click(decrementButton);
    // Assert
    expect(counter.textContent).toEqual("0");
  });
});
```

**AAA 模式**：编排（Arrange），执行（Act），断言（Assert）

几乎所有的测试都是这样写的。首先，您要**编排(初始化)\*\***您的代码，以便为接下来的步骤做好一切准备。然后，您\***\*执行**用户应该执行的步骤(例如单击)。最后，您对应该发生的事情进行**断言**。

### Arrange 编排

- 渲染组件（RTL'API render）
- 获取所需要的 DOM 的不同元素

```typescript
function render(){  //使用ReactDOM呈现组件
	ui: React.ReactElement,  //加载的组件
  options?: Omit<RenderOptions, 'queries'>  //渲染选项
}: RenderResult
```

RenderResult 的属性 queries

与 DOM testing library 不同的是，它的第一个参数已经绑定在了 DOM 上，不过也还是可以使用 screen

查询参数可以是字符串，正则，或者一个返回了 bool 的函数

```typescript
// Matching a string:
screen.getByText("Hello World"); // full string match
screen.getByText("llo Worl", { exact: false }); // substring match
screen.getByText("hello world", { exact: false }); // ignore case

// Matching a regex:
screen.getByText(/World/); // substring match
screen.getByText(/world/i); // substring match, ignore case
screen.getByText(/^hello world$/i); // full string match, ignore case
screen.getByText(/Hello W?oRlD/i); // substring match, ignore case, searches for "hello world" or "hello orld"

// Matching with a custom function:
screen.getByText((content, element) => content.startsWith("Hello"));
```

具体的 api 分为几种类型：

- getBy 没有查询到或者查询到不止一个会抛出一个错误
- queryBy 没有找到不会报错，会返回 null，可以用来判断节点是否存在，多余一个不会报错

- findBy 返回一个 Promise，使用 await
- getAllBy

- findAllBy
- queryAllBy

具体的用法：

- labelText
- placeHolderText

- text
- displayValue

- altText
- title

- role
- testId

screen.debug() 打印 document 的结构

### Act 执行

```typescript
fireEvent(node: HTMLElement, event: Event)

fireEvent.click(incrementButton);
// OR
fireEvent.click(decrementButton);
```

### Assert 断言

```typescript
expect(counter.textContent).toEqual("1");
expect(counter.textContent).toEqual("0");
```

### cleanup

需要配合可以提供全局 afterEach 的测试框架使用，比如，ava，jest，这个操作会自动完成，否则，需要手动去调用

用于防止内存泄漏，卸载用 render 挂载的 React tree

```typescript
afterEach(cleanup);
```

## Jest

```bash
npm install --save-dev jest
npx jest --init
npm i babel-jest @babel/core @babel/preset-env -D

//package.json
"scripts": {
   "test": "jest",
   "coverage": "jest --coverage"  //输出测试代码覆盖率
 },
```

Jest 是测试的真实 runner

- test suits 测试套件 - describe
- test cases 测试用例 - it,test

- assertions 断言 - expect
- ...

### 常用 API

- describe 可以用来分组

- - hooks

- - - beforeAll
    - beforeEach

- - - afterEach
    - afterAll

- test/it

- - 参数 1 string 描述测试用例
  - 参数 2 callback 具体执行的测试方法

- expect
- not 对 matcher 的否定

- matcher

- - toBe 原始类型相等

- - - 逻辑判断

- - - - toBeNull
      - toBeUndefined

- - - - toBeDefined
      - toBeTruthy

- - - - toBeFalsy

- - - 数字判断

- - - - toBeGreaterThan
      - toBeGreaterThanOrEqual

- - - - toBeLessThan
      - toBeLessThanOrEqual

- - - - toBeCloseTo 浮点数判断

- - - 字符串匹配 toMatch
    - 数组，字符串

- - - - toContain 包含
      - toHaveLength 长度

- - - 错误 toThrow 抛出的错误如预期
    -

- - toEqual 引用类型相等

### 异步任务测试

- 默认 test 执行的方法不会去等待异步任务的结果，可以给参数 2 传入 done 来解决，会等待 done 所在的代码块调用 done 再返回结果
- async await

- resolves api 配合 toMatchObject

### 如何测试异常情况

jest 不会处理我们的 catch 内的内容，可以配合 expect.assertions(1)

意思是 期望执行的断言是 1 次，catch 是被当作一次断言的

也可以使用 rejects
