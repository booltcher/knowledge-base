---
outline: [2, 3]
tags: 
  - Vue 
  - 源码
publishDate: 2021/07/10
---

# 挂载流程

在此之前要先进行**初始化**或者叫**实例化**。

[实例化流程](/src/dev/vue/vue-init) 

## 第一步：模板编译

> 源码：`vuejs/vue/src/platforms/web/runtime-with-compiler.ts - Vue.prototype.$mount`

**最终结果**：生成`render`方法并赋值到`options.render`上，这个`render`方法用来生成模板对应的虚拟DOM。

## 第二步：更新到真实DOM
> 源码：`vuejs/vue/src/core/instance/lifecycle.ts - mountComponent()`

### `mountComponent`

- 为实例初始化Watcher
- 初始化时会执行一次`updateComponent`
- `updateComponent` 实际做两件事
    - `vm._render()` 生成虚拟DOM
    - `vm._update()` 将虚拟DOM转化为真实DOM
- `_update`核心是`patch()`

### `patch`

[Diff算法(v2)](/src/dev/vue/vue-diff2)