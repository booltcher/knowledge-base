---
outline: [2, 3]
tags: Vue
publishDate: 2020/04/21
---

# Vue 组件化

## 什么是组件化

将一个复杂系统根据业务和功能拆分为一个个独立的模块，分离每个模块的责任和边界。
组件一般可以分为<HighlightText text="页面组件" />，<HighlightText text="业务组件" />，<HighlightText text="功能组件" />。

## 为什么要组件化

- 未组件化的系统往往<BracketsText text="牵一发而动全身" />
- 便于协同开发
- 利于升级和维护
- 提高代码的复用性
- 提高渲染性能：因为依赖收集系统会以组件为单位（组件在`$mount`时，生成`Watcher`，绑定着当前组件的更新函数。)

## 怎么实现组件化

> 源码地址：`src/core/global-api/assets.js`

步骤

- 注册(定义)
  - 全局注册`Vue.component()`：将用户传入的组件配置对象传入`Vue.extend()`，生成组件的构造函数，并且为每一个 Vue 实例合并添加`components`属性
  - 内部注册`components`选项：单文件组件，vue-loader 会编译 `template` 为 `render` 函数，最终导出的依然是组件配置对象
- 引入
- 交互

## 组件技术三要素

属性，事件，插槽

## 组件划分原则

- 高内聚低耦合
- 单向数据流

## 组件通信

1. props props 可以传递一个 function 给子组件 子组件通过调用该方法并将数据作为参数传递给父组件
2. $emit
3. $children $ref $parent
4. eventBus
5. Vuex
6. $attr $listeners
7. (作用域)插槽
8. provide inject

### provide/inject

跨代传递数据，只要是后代都可以拿到。如果是静态数据，可以将`provide`定义为对象，如果是动态数据，可以定义为一个方法返回一个对象。

`inject`可以是一个数组，或者对象`key`为本地的绑定名，`value`为注入的属性名。

### $parent

为什么不推荐使用？有什么缺点？

1. **紧耦合性（Tight Coupling）**：使用 **`$parent`** 会使组件和其父组件之间产生紧密耦合。这意味着子组件依赖于其特定父组件的结构和实现细节。这种紧耦合会增加组件间的依赖性，降低了组件的可重用性和可维护性。
2. **可读性差**：在大型应用中，使用 **`$parent`** 可能会使代码变得难以理解和维护。其他开发人员阅读代码时，可能难以确定 **`$parent`** 引用的确切父级组件是哪一个。
3. **不利于单元测试**：依赖 **`$parent`** 会使单元测试变得困难。如果组件依赖于其父级组件，那么在测试组件时需要模拟或者创建这些父级组件的实例，这会增加测试的复杂度。
4. **不稳定性**：当父组件结构发生变化时，比如父组件的层级结构调整或者某些父组件被删除，使用 **`$parent`** 的子组件可能会受到影响，导致代码不稳定。
5. **难以追踪状态变化**

## 动态组件

使用`is`属性和`component`标签：

```vue
<component :is="currentComponent"></component>
```

## 异步加载


```js
components: {
  'my-component': () => import('./my-async-component')
}
```

## 在父组件中监听子组件的生命周期
```vue
<Child @hook:mounted="doSomething"/>
<Child @hook:updated="doSomething"/>
```

## 在组件上使用`v-model`

`v-model`是`@input`和`:value`的语法糖，所以只要在组件中通过`props`接受一个`value`属性，并且在触发修改时`emit`一个`input`方法就可以：

```js
{
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
}
```

## 函数式组件

- 特点：无状态(data)且无实例(this)；渲染开销小。
- 用途：可以用来控制具体视图的显示，只处理逻辑。
- 用法：设置属性`functional: true`
