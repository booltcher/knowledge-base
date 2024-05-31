---
outline: [2, 3]
tags: Vue Source-Code
publishDate: 2021/07/10
---

# 响应式原理



### observe()

observe()方法的核心是new一个Observer对象，用来表示响应式后的属性

Observer构造函数中，new实例化了一个Dep，

Observer对象主要有两个属性，第一个是value，存储属性的值；另一个是dep，描述这个响应式的值对应的Dep对象；

Observer对象有一个核心方法walk是循环对象的key调用defineReactive()，如果value还是一个对象就递归进行，对深层数据也调用defineReactive()

### defineReactive()

我们说的最多的Object.defineProperty()就是在这里工作的

每个值被访问时，触发getter，调用定义好的get()，将当前dep与当前的Watcher()绑定

每个值被设置时，触发setter，调用定义好的set()，调用dep.notify()通知在get时收集到的Watcher()

### notify()

循环收集的Watcher，将它们放进一个队列queue，定义了一个方法mflushSchedulerQueue，这个方法用来调每个Watcher的更新函数，再通过nextTick()包装这个方法，异步清空这个队列。

每个Watcher有对应组件实例的_updateComponent方法，生成一个渲染函数，这个渲染函数返回更新后的虚拟DOM

再patch()，通过diff算法精确定位到每一个组件需要更新的节点。

简而言之：

每一个响应式的值对应一个Dep

每一个组件对应一个Watcher

访问值时，收集当前的Watcher；修改值时，通知之前收集的Watcher更新

每个Watcher都有对应的组件实例的更新函数，生成虚拟DOM，再patch()更新DOM。

刚刚说的每一个组件对应一个Watcher，其实是Vue2对比Vue1的更新，

在vue1中，是每一个响应式的值对应一个Watcher，所以直接可以精确到定位到需要更新的节点，这是一个细粒度的处理方式，但是一个值一个Watcher会造成大量的开销，这使得vue1曾经被人称为“玩具框架”，不能用来做大项目。

vue2采用了中等粒度，每一个组件对应一个Watcher，大大提高了性能，但是没有办法去精确定位到节点，如果直接去更新一个组件就是全量更新，这也会降低性能，增加了很多不必要的DOM操作，所以虚拟DOM和diff算法的出现就是为了实现精确定位到节点的更新，先比对，筛选出更新的节点，再去做更新处理。所以说vue2引入了虚拟DOM是一个必然结果。虚拟DOM这个技术也不是vue专属的，vue的虚拟DOM技术也不是自己从0实现的，是借用了snabbdom这个第三方库，对库做了一些修改。

## Vue响应式是怎么实现的？

**简单的说**

通过`Object.defineProperty()`这个属性，对实例的属性进行拦截，为每个属性设置set和get，在这些属性被访问和操作时，触发这两个方法，再配合发布订阅模式，实现对组件的局部更新。

**详细点说**

在初始化Vue实例时有一个`initState`方法，用于初始化组件的`props/methods /data/computed/watch`属性，其中`initData`方法用来初始化`data`。这个方法主要执行了两个方法：

- `proxy()`：代理。实现了我们在通过`this.xxx`访问`data`里的属性时，代理到`this._data`上。
- `observe()`：响应式处理。核心是创建一个Observer实例，并使用`defineReactive` 方法使其变为响应式。

`defineReactive` 方法的核心就是常说的`Object.defineProperty` 这个方法工作的地方：

- 值被访问时，通过`getter`将响应式的值和组件关联起来
- 值被更新时，通过`setter`通知所以关联的组件更新

> 每一个响应式的值对应一个Dep
每一个组件对应一个Watcher，每个Watcher有对应组件实例的`updateComponent`方法来更新视图
> 

`updateComponent` 方法的核心就是两步：

- `_render()`：生成虚拟DOM
- `_update()`：内部调用`patch()`来将虚拟DOM更新为真实DOM

## 如何能检测数组的变化？

数组就是使用 `object.defineProperty` 重新定义数组的每一项，那能引起数组变化的方法我们都是知道的， `pop` 、 `push` 、 `shift` 、 `unshift` 、 `splice` 、 `sort` 、 `reverse` 这七种，只要这些方法执行改了数组内容，我就更新内容就好了，是不是很好理解。
1. 是用来函数劫持的方式，重写了数组方法，具体呢就是更改了数组的原型，更改成自己的，用户调数组的一些方法的时候，走的就是自己的方法，然后通知视图去更新。
2. 数组里每一项可能是对象，那么我就是会对数组的每一项进行观测，（且只有数组里的对象才能进行观测，观测过的也不会进行观测）
vue3：改用 `proxy` ，可直接监听对象数组的变化。

## Vue 的响应式原理中 `Object.defineProperty` 有什么缺陷？为什么在 Vue3.0 采用了 `Proxy`，抛弃了 `Object.defineProperty`？

1. **对于数组的监听有限**：只是监听了数组的 push()、pop()、shift()、unshift()、splice()、sort()、reverse() 这七种方法，其他数组的属性检测不到。Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
2. **不便于多层级对象的监听**：Object.defineProperty 只能劫持对象的属性，因此对每个对象的属性进行遍历时，如果属性值也是对象需要深度遍历，那么就比较麻烦了，所以在比较 Proxy 能完整劫持对象的对比下，选择
Proxy。
3. **不能监听新增属性和删除属性：**必须手动调用Vue的API来新增和删除属性Vue.set()，Vue.delete

- 之前会使用Object.defineProperty遍历对象的所有key，这会导致递归地处理，速度慢；而在新的实现中，使用Proxy做了懒处理，如果应用没有读到这个值永远不会去处理，是一个运行时处理而不是初始化。
- 依赖关系占用资源较多：Dep Watch Observer
- v2中数组的拦截需要额外处理
- v2中属性删除和增加不能监听到，必须使用Vue的API才行
- v2不支持Map Set

### Proxy的优势：

- 代码简洁
- 性能更好
- 更加强大与灵活