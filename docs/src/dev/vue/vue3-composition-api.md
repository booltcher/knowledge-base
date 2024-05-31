---
outline: [2, 3]
tags: Vue Vue3
publishDate: 2024/01/10
---
# Composition API

## 组合式API vs 选项式API

**选项式API**
- 风格：基于`this`(组件实例)，面向对象
- 对新手友好，因为官方通过若干个选项定义了文件结构

**组合式API**
- 风格：函数式
- 更加灵活，开发者占更多控制权
- 组织和重用逻辑更容易

## `setup`

提供了一个集中处理响应式数据、计算属性和函数等的场所。

- `setup`的执行时机早于所有的生命周期。
- `setup`语法糖可以在`script`标签上使用`setup`，以省略`setup`方法以及其中的`return`
- `setup`可以和选项式API一起使用， 可以从选项式中获取`setup`中`return`的数据和方法，但不能从`setup`中读取选项中的数据和方法，因为`setup`中的`this`是`undefined`。

## 多script

在Vue3中一个组件有两个script标签是很正常的，一般一个专门用来定义组件的名称，另一个就是setup。

推荐使用一个插件：**`vite-plugin-vue-setup-extend`**

这样就可以直接在script上使用`name`属性来定义组件名称。

## 响应式方法

### `ref`

可以用来定义任何类型的值（对象，数组等），返回结果是一个`refImpl`对象，在模板以外需要使用`value`来获取真实的值（可以通过开启VS Code Volar的自动插入`.value`功能），用来定义引用类型的响应式的值时，其底层也是使用了`reactive`方法。`ref`会使值深度响应式。建议使用`ref`来作为响应式状态的主要API。

### `reactive`

只能用于定义引用类型的响应式值。基本类型则会报错。

对同一个原始对象调用 `reactive()` 会总是返回同样的代理对象，而对一个已存在的代理对象调用 `reactive()` 会返回其本身。

`reactive`的局限性：

- 类型只能是引用类型
- 在重新分配对象时响应式就会失效，可以使用`Object.assign()`

### 推荐用法：

1. 若需要一个基本类型的响应式数据，必须使用 `ref`
2. 若需要一个响应式对象，层级不深，`ref`、`reactive` 都可以。
3. 若需要一个响应式对象，且层级较深，推荐使用 `reactive`。

### `toRefs`

需要使用解构时toRefs可以让对象的属性保持响应式。

## 常用的其他API

### `shallowRef` & `shallowReactive`

只对顶层做响应式处理，对所以深层次对象不做处理，可以提升性能

如果只关注第一层（只关注整体是否被修改）

### `readonly` & `shallowReadonly`

对数据的一种保护，比如有一个数据很重要，想避免误操作给修改了，可以使用readonly，这样就可以访问但是不能写。

虽然是readonly的，但是和依赖的数据还会维护着依赖关系，但是不能直接修改

shallowReadonly 只处理顶层为只读。

### `toRaw`

获取一个响应式对象的原始对象

用途：将响应式的对象传给Vue之外的库或外部系统时，以获取到原始对象

### `markRaw`

标记一个对象，使其永远不会成为响应式

用途：比如使用mockjs来模拟数据时，为了避免其变为响应式的值

### `customRef`

```jsx
let msgValue = "hello";
let msg = customRef((track, trigger)=>{
	return {
		get(){
			track();  // 让Vue在msg变化的时候更新
			return msgValue;
		}
		set(val){
			msgValue = val;
			trigger(); // 通知Vue数据变化了
		}
	}
})
```

## 宏命令

- `defineProps`
- `defineEmits`
- `defineModel` 声明一个双向绑定 prop
- `defineExpose`

## 生命周期

在组合式API中有些许改动：

- `beforeCreate` `created` ⇒ `setup`
- `beforeMount` `mounted` ⇒ `onBeforeMount` `onMounted`
- `beforeUpdate` `updated` ⇒ `onBeforeUpdate` `onUpdated`
- `beforeDestroy` `destroyed` ⇒ `onBeforeUnmount` `onUnmounted`

## `props`

使用`defineProps`，可以直接使用接受的值，也可以将`defineProps`的返回值保存起来

还可以限制类型：

```jsx
defineProps<{list: PersonList}>
```

指定默认值：

```jsx
withDefaults(
	defineProps<>(),
	{
		list: PersonList
	}
)
```