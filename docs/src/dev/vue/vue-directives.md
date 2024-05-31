---
outline: [2, 3]
tags: Vue
publishDate: 2021/07/10
---

# 指令
## v-pre

标记该节点和其子节点是静态节点。不用进行编译。

## v-if/v-for/v-model实现原理
```js
const ast = compiler.compile('<div v-if="false"></div>')
console.log(ast.render)
// v-if会被编译成三元表达式

const ast = compiler.compile('<div v-for="i in 3"></div>')
// v-for会被编译成一个循环函数,分多次返回标签

// v-model如果绑定在input输入框，会被编译成一个内部指令 如果是input输入框 就会有一个value属性和一个input事件
// 如果是组件上，不会编译成v-model， 就是一个input加value的语法糖
```

## v-for

- 遍历数组时第二个参数是index
- 遍历对象时第二个参数是key表示对象的键值，第三个参数是index
- 遍历一个整数时，从1开始

## 自定义指令
```js
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

### 钩子函数

---

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

### 钩子函数参数

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- `binding`：一个对象，包含以下 property：
    - `name`：指令名，不包括 `v-` 前缀。
    - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
    - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
    - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
    - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [**VNode API**](https://v2.cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

### 简写
`Vue.directive` 第二个参数可以接受一个function而不是一个对象，function会被用于bind和update钩子的回调。

### 用例
- `v-loading="boolean"` 灵活切换组件是否处于loading状态被mask覆盖
- `v-debounce:1000="handler"` 一般用于交互元素的防抖
- `v-permission="permissionName"`用于按钮级别的权限控制

### V3自定义指令生命周期改动
与组件生命周期名相似。

- **`created`** - 新增！在元素的 `attribute` 或事件监听器被应用之前调用。
- `bind` → **`beforeMount`**
- `inserted` → **`mounted`**
- **`beforeUpdate`**：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
- `~~update` → 移除！~~
- `componentUpdated` → **`updated`**
- **`beforeUnmount`**：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
- `unbind` -> **`unmounted`**