---
outline: [2, 3]
tags: Vue Source-Code
publishDate: 2021/07/10
---

# 响应式原理
> 源码：`src/core/instance/init.js`


## 从源码的角度详细描述这个过程(new Vue()后都发生了什么)：
实际执行`_init()`方法：
1. 合并系统选项和用户选项
2. 初始化组件的关系 - `initLifecycle` : 初始化组件的`$parent`,`$children`,`$refs`,`$root`等属性
3. 初始化事件 - `initEvents` : 一些自定义事件，`$on`,`$off`,`$emit`
4. 初始化渲染 - `initRender` 插槽`$slots`,`$scopeSlots`,`_c`,`$createElement`
5. 调用生命周期钩子(`callHook`)`beforeCreate`(接下来都是状态处理)
6. `initInjections` 处理`provide/inject`,从父辈继承数据
7. `initState` 处理自己的数据`props`,`methods`,`data`,`computed`,`watch`对组件状态响应式处理，创建响应式属性的`Dep`并进行依赖收集
8. `initProvide` 传递给后代数据
9. 调用生命周期钩子(`callHook`)`created`
10. 判断如果选项里有`el`，自动挂载
11. -挂载的时候，声明组件更新函数创建组件的渲染Watcher实例

其中在initState阶段有个initData，这个方法主要做两件事：
- 代理： proxy()方法，实现了我们在通过this.xxx访问data里的属性时，代理到this._data上
- 响应式处理：遍历属性，调用observe()