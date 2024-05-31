---
outline: [2, 3]
tags: Vue Source-Code
publishDate: 2021/07/10
---

# 模板编译

发生的时机：挂载阶段

大致流程：parse → render → vNode → patch → New VDOM → 真实DOM

分为运行时编译和构建时编译：

- 运行时编译需要Vue的编译器：需要完整版`vue.js`
- 构建时编译需要在Webpack中使用vue-loader：就可以使用运行时版，不提供编译功能：`vue.runtime.js`

简单来说，就是如果你用了 vue-loader ，就可以使用 `vue.runtime.min.js`，将模板编译的过程交过 vue-loader，如果你是在浏览器中直接通过 `script` 标签引入 Vue，需要使用 `vue.min.js`，运行的时候编译模板。

模板编译是有缓存的，会将模板字符作为key去缓存中查找，找到了就不用编译直接返回。

## 如果同时设置了render，template，el该使用哪一个

> 源码：`vuejs/vue/src/platforms/web/runtime-with-compiler.ts - $mount()`

render > template > el

## AST

用对象来表示代码结构。

很多库都会在编译时先转为AST：Babel，Webpack，Rollup

为什么要转化成AST：template字符串是不便于修改的，而AST是对源码的抽象，是一种结构化表示，就容易修改来做一些优化。比如标记静态内容，以便在patch阶段可以直接跳过静态内容。

## 编译流程

> 源码：`vuejs/vue/src/compiler/index.ts`

parse → AST

AST 优化

AST → render函数

核心是三步：

- 解析（parse）
- 优化（optimize）
- 生成（generate）

```js
export const createCompiler = createCompilerCreator(function baseCompile(
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

## `parse` 解析

> 源码：`vuejs/vue/src/compiler/parser/html-parser.ts`

核心方法是 parseHTML。而Vue也是借助了一个第三方库：`simple html parser`

定义了大量的正则表达式用来匹配模板中的内容：属性，开始标签，结束标签，注释，文档声明。

`parseHTML`中使用`while`来遍历模板字符串，将匹配过的部分处理并截取，直到全部处理完。

处理就是转换为AST。

## `optimize` 优化

> 源码：`src/compiler/optimizer.ts`

将AST中的静态节点属性`static`标记为`true`。

静态节点主要是文本节点和`pre`的节点。

优化的目的就是标记静态节点：就是永远不会发生变化的节点，这些节点不用重新渲染，在patch时就可以跳过这些节点，从而提高性能。

- `markStatic` 标记所有静态节点
- `markStaticRoots` 标记所有静态根节点

## `generate` 生成

> 源码：`src/compiler/codegen/index.ts`

将优化后的AST对象转换成字符串类型的代码。

这个字符串会在后面的步骤中通过`new Function`转换成匿名函数。是一个`with(this)`方法。

最终这个方法会被挂载到Vue实例的`render`和`renderStaticFns`上。

## with语法

用来扩展一个语句的作用域链。可以省略前面的空间名前缀。

```js
with (Math) {
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}
```

## h函数是什么

- render函数：用JS来描述DOM
- createElement：Vue提供的这个方法来生成虚拟DOM
- h：就是源码中的_c方法