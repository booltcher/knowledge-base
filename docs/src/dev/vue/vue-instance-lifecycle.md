---
outline: [2, 3]
tags: 
  - Vue
publishDate: 2023/03/27
---
# Vue实例生命周期
## 实例化阶段


### beforeCreate：

实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性

### created：

实例已经在内存中创建OK，此时 `data` 和 `methods` 已经创建OK，此时还没有开始编译模板

### beforeMount：

此时已经完成了模板的编译，但是还没有挂载到页面中。
换句话说，此时页面中的类似 `{{msg}}` 这样的语法还没有被替换成真正的数据。

### mounted：

此时，已经将编译好的模板，挂载到了页面指定的容器中显示【可以获取 DOM 节点或发起异步请求】
用户已经可以看到渲染好的页面了

## 运行阶段


### beforeUpdate：

状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的
数据还是旧的，因为此时还没有开始重新渲染DOM节点

### updated：

实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完
成了更新，界面已经被重新渲染好了！

## 销毁阶段

### beforeDestroy：

实例销毁之前调用。在这一步，实例仍然完全可用。

### destroyed：

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监
听器会被移除，所有的子实例也会被销毁。

## 父子组件生命周期钩子执行顺序

- **开始从外到内，结束从内到外**
- 特殊的是，在渲染过程中，**父组件的挂载阶段才开始创建子组件**，子组件创建并挂载完父组件才挂载完成

### 渲染过程：

父beforeCreate->

父created->

父beforeMount->

子beforeCreate->

子created->

子beforeMount->
子mounted->

父mounted

### 更新过程：

父beforeUpdate->

子beforeUpdate->

子updated->

父updated

### 销毁过程

父beforeDestroy->

子beforeDestroy->

子destroyed->

父destroyed

## 父组件如何监听子组件的生命周期

```vue
<!-- Parent.vue -->
<Child @mounted="doSomething"/>

<!-- Child.vue -->
mounted() {
  this.$emit("mounted");
}

<!-- 简写 -->
<Child @hook:mounted="doSomething"/>
<Child @hook:updated="doSomething"/>
```

![生命周期](/src/assets/vue-lifecycle.png)