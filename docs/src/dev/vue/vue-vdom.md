---
outline: [2, 3]
tags: Vue Source-Code
publishDate: 2021/07/10
---

# Vue 中的虚拟 DOM

## 什么是虚拟 DOM？

用 JS 对象来描述真实 DOM。

## 虚拟 DOM 的优势

### 体积小

体积优势：DOM 中有大量的冗余属性(317 个属性和方法)，使用 VDOM 可以减少内存的开销。

### 跨端

将渲染行为抽象。

只要将 VDOM 对接至不同的宿主环境，就可使实现一套代码多端渲染。

## 虚拟 DOM 之于前端

这个问题需要在足够长的时间中依据足够的上下文来作对比，历史长河中 DOM 操作解决方案：

- **远古，被原生 JS 支配下的“人肉 DOM”时期**：页面的**展示**属性远重于**交互**，前端大量时间在于实现静态 DOM，一切结束后加以少量 JS
- **解放生产力，JQuery 主宰的先导阶段**：丰富的交互需求、大量 DOM 操作带来前端工作的激增，原生 JS 的 DOM API 效率太低了，而 JQuery 在解决这个问题的同时做掉了跨浏览器的兼容工作，并且提供了链式调用、插件扩展等一系列能力用于进一步解放生产力
- **民智初启，原始模版引擎方案**：JQuery 并不能从根本上解决**DOM 操作量过大**的弊病，而模版引擎方案倾向于点对点解决繁琐 DOM 操作的问题，输入指令可以自动执行，它不是为了取代 JQuery，两者共存。模版引擎就是将 JS 和 HTML 结合在一起的一系列规则，即**数据+模板=HTML 代码**，最后将这段代码插入到页面中，这时就可以只用关注数据变化即可，但是它的局限也很明显，是基于高效的字符串拼接，所以不能实现过于复杂的功能，尤其是在性能上的表现不尽人意，因为它用整体新的 DOM 直接去替换旧的 DOM，每次都是**全量更新**，没有缓存一说。
- **新时代，数据驱动视图，虚拟 DOM 时代**：思想上与模板引擎是一个递进关系，但无从考证虚拟 DOM 发明过程是否借鉴模板引擎。数据+模板不再直接生成真实 DOM 而是加了一层虚拟 DOM，这里的模板不是指模板引擎的模板，而是泛指这类语法，比如 Vue 模板语法，React JSX。更新时，先使用新旧虚拟 DOM 树进行比对(diff)，筛选出真正需要更新的部分，再打补丁(patch)到真实 DOM 上，即**差量更新**。它是在较好的开发体验和过得去的性能上的一个折中方案。

## 面试题：选择虚拟 DOM 是为了更好的性能吗？

**不是。它是在较好的开发体验和过得去的性能上的一个折中方案。**

🌰：使用真实 DOM 时，不同的开发者带来的性能差异会很大，举个最简单的例子，对于一个列表，我们在更新其内部的元素时，有经验的开发者可能只会对更新的部分进行更新，而新手可能会更新整个列表的元素。

**性能是一个很难被量化的指标，讨论性能好坏需要结合具体的渲染阶段，数据量，参照物等。**

🌰：如果只是一个轻量级的应用，使用虚拟 DOM 可能不如直接操作原生 DOM。

🌰：在首次加载时，虚拟 DOM 相对于真实 DOM 操作多了一步对大量数据进行处理来生成虚拟 DOM，所以只针对于这个阶段下虚拟 DOM 的性能也不如原生 DOM。

🌰：如果要更新的数据量更新特别大，已经接近全量更新了，那么虚拟 DOM 则没有任何优势；大多数情况下，每次更新只更新极少量的 DOM，那虚拟 DOM 性能更优

**虚拟 DOM 的价值不在性能。**

## 虚拟 DOM 的价值是什么？

- **降低开发成本，提升开发效率，关注点抽离**：比如我们使用 React 和 Vue，不用再去关心视图如何更新，只需要关注于业务逻辑，更新了数据会自动触发视图的更新，不用再去编写大量更新视图的代码。
- **普适性**：我的理解是大多数开发者都能开发出性能还过得去的应用，保证了**性能的下限**。而写出高性能的真实 DOM 操作需要开发者极高的素养。
- **跨平台**：可以将结构抽象成虚拟DOM后可以根据不同的宿主环境渲染成不同的结果

## Vue 的虚拟 DOM

### Snabbdom

Vue 中的虚拟 DOM 和`patch`都是基于库[Snabbdom](https://github.com/snabbdom/snabbdom)。

::: info
Snabbdom 是瑞典语**快速的**。在Github上核心代码就200行，是用TS写的。
:::

### `h`函数

- 可以生成虚拟 DOM：`h(’a’, {}, ‘这是一个链接’);`
- `h`函数可以嵌套

### `patch()`
- 可以让虚拟 DOM 上树

### `VNode`类

```js
export default class VNode {
  tag?: string
  data: VNodeData | undefined
  children?: Array<VNode> | null
  text?: string
  elm: Node | undefined
  ns?: string // namespace
  context?: Component // rendered in this component's scope
  key: string | number | undefined
  componentOptions?: VNodeComponentOptions
  componentInstance?: Component // component instance
  parent: VNode | undefined | null // component placeholder node

  // 和等等其他内部属性...

  get child(): Component | void {
    return this.componentInstance
  }
}
```
