---
outline: [2, 3]
tags: 
  - Vue 
  - Vue3
publishDate: 2024/01/10
---

# Vue3 改动一览

## 版本改动

设计核心：

- **更小**：
  - 移除了一些不常用的 API
  - 全局 API 从`app`访问而不是 Vue 上的静态方法，有利于**摇树优化**减少打包体积
- **更快**：
  - Diff 算法优化：使用了**最长递增子序列**优化了比对流程
  - 静态节点提升
  - 缓存事件处理程序
  - SSR 优化
  - 块 block：将父元素包成一个块，将动态内容写进去，下次`patch`时，递归到这一步时只用处理块里的动态部分就行了，剩下的静态内容都可以不用管。`patchBlockElement`
- **更友好**：
  - 逻辑友好：引入了 Composition API，使代码组织更清晰，更加易于复用和维护
  - TS 友好：使用 TS 重写核心库，拥有了更好的 TS 支持与调试
  - API 友好：增强 API 一致性
- **更强大**
  - 基于`Proxy`的响应式系统，功能更强大，操作更便捷，性能更好
  - `Teleport`，`Fragment`，`Suspense`

### 组合式 API

[Composition API](/src/dev/vue/vue3-composition-api)

### 小改动

- `$attrs`包含`class`和`style`
- `v-if`的优先级高于`v-for`
- 通过`createApp`方法创建应用实例而不是`new Vue`
- v3 中即使是根实例的`data`也不能是对象了
- h 函数：在 Vue2 中 h 函数作为`render`方法的默认参数。Vue3 中要显示地导出
- `mount`方法：Vue2 中是替换，Vue3 中是追加

### 自定义指令生命周期

与组件生命周期名相似。

- **`created`** - 新增！在元素的 `attribute` 或事件监听器被应用之前调用。
- `bind` → **`beforeMount`**
- `inserted` → **`mounted`**
- **`beforeUpdate`**：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
- `~~update` → 移除！~~
- `componentUpdated` → **`updated`**
- **`beforeUnmount`**：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
- `unbind` -> **`unmounted`**

### `v-model`

v3 的实现不再是`value`和`input`方法，而是`modelValue`和`update:modelValue`方法，这是默认的，可以通过 v-model:xxx 来修改掉默认的 modelValue，这样的好处是可以设置多个 v-model

:::info
`$event`到底是啥？啥时候能`.target`
对于原生事件，`$event`就是事件对象
对于自定义事件，`$event`就是触发事件时，所传递的数据
:::

### 全局 API 转移到应用实例上

- 改为应用实例 API
- 全支持 tree-shaking：因为之前是全局方法/全局组件(transition)，无法做到 tree-shaking，而现在的内部 API 和全局 API 经过重构，需要通过具名导出进行访问，这样如果打包工具支持 tree-shaking，则没有使用的全局 API 将不会被打包进最终产物

```js
// old
Vue.xxx();
// new
app.xxx();
```

比如：

```jsx
app.component();
app.config();
app.directive();
app.mount();
app.unmount();
app.use();
```

### `key`的设置

- v-if v-else v-if-else 在 vue2 中推荐设置 key，在 vue3 中不推荐设置，因为 Vue 现在会为其生成独一无二的 key，如果手动提供，必须保证 key 都是唯一的。
- vue2 中 template 上不可以设置 key，而 vue3 中可以了

### `v-bind`合并行为

- Vue2 中 单独设置的属性总会覆盖 v-bind 中的属性
- Vue3 中 取用谁的值依赖于顺序上谁是后者

### `v-on`的修饰符

- `native`被废弃：Vue3 中要触发的事件得在`emits`中定义，未定义的 Vue 会当做原生事件进行处理。
- 不再支持使用数字 (即键码) 作为  `v-on`  修饰符

### 异步组件

- component 选项变为 loader
- 使用 defineAsyncComponent 方法定义

v2 写法：

```js
const asyncModal = {
  component: () => import("./Modal.vue"),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent,
};

// 简写
const asyncModal = () => import("./Modal.vue");
```

v3 写法：

```js
import { defineAsyncComponent } from "vue";
import ErrorComponent from "./components/ErrorComponent.vue";
import LoadingComponent from "./components/LoadingComponent.vue";

// 不带选项的异步组件
const asyncModal = defineAsyncComponent(() => import("./Modal.vue"));

// 带选项的异步组件
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import("./Modal.vue"),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent,
});
```

### 动态属性缩写

如果属性绑定的变量名和属性名相同可以省略写法，类似于 JS 对象的缩写写法：

```js
<!-- same as :id="id" -->
<div :id></div>

<!-- this also works -->
<div v-bind:id></div>
```

### `mixin`合并规则

现在只会合并浅层

```jsx
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}

// Result
{
  "user": {
    "id": 2
  }
}
```

### 过渡组件

- 过渡效果开始的类名变为了`v-xxx-from`
- `transition`作为组件根节点时过渡效果会失效了
- `transition-group` 默认不渲染根元素了

```jsx
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}

// vue3
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

### `ref`

**用于原生 DOM 元素：**

可以用来绑定到一个元素上以获取真实的 DOM。此操作为模板引用。

需要注意的是这个`ref`在挂载完成前是`null`，只有挂载完成（在`onMounted`回调中）才可以获取到正确的 DOM。

**用于组件元素：**

可以获取到子组件实例，这可以用来做组件通信：

- 如果子组件是通过 setup 定义的，子组件上的属性和方法默认都是私有的，除非使用`defineExpose`宏方法来暴露出去。
- 如果子组件是选项式 API 定义的，父组件就有完全的访问权使得父子组件紧密耦合，这是不推荐的做法。首先应考虑标准的组件通信方法`props`和`emit`。

## 新元素

### `Teleport`

有时创建组件但是想让它在结构上属于其他组件，从而可以突破样式的限制等。比如模态框之类。如果让 Modal 属于组件，其 CSS 会受到很多限制，比如`fixed`定位时，父组件不能使用一些属性（`transform`、`perspective`  或者  `filter`  样式属性），又或者在设置 Modal 的`zIndex`时受到了父级的限制。

传送门就可以将片段传送到某一个 DOM 节点下，`to`属性可接收一个 CSS 选择器或者一个 DOM。

它还可以接受一个`disabled`参数，来在特殊时期禁用。

### Fragments

vue3 组件可以拥有多个根节点。

```vue
<template>
  <header></header>
  <main></main>
  <footer></footer>
</template>
```

### **Suspense**

让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。**`Suspense`** 组件中有两个插槽：**`default`** 和 **`fallback`**。**`default`** 插槽用于渲染异步组件，在异步组件加载完成后显示；**`fallback`** 插槽用于渲染加载过程中的占位内容，例如显示一个加载提示。

`<Suspense>`  可以等待的异步依赖有两种：

1. [**异步组件**](https://cn.vuejs.org/guide/components/async.html)
2. 带有异步  `setup()`  钩子的组件：这也包含了使用  `<script setup>`  时有顶层  `await`  表达式的组件。

```vue
<suspense>
      <template #default>
        <async-component></async-component>
      </template>
      <template #fallback>
        Loading...
      </template>
    </suspense>
```

## 移除的特性

- `$listeners` 移除，放进了`$attrs`
- `funcional` 的设置被移除：Vue3 中函数式组件带来的性能提升已经可以忽略不计。官方建议只使用有状态的组件。
