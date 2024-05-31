---
outline: [2, 3]
tags: Vue Vue3 Source-Code
publishDate: 2024/01/10
---
# `createApp`方法的本质

> 源码：packages/runtime-dom/src/index.ts

## `createApp`

- 首先调用了`ensureRenderer`生成渲染器，渲染器的存在使得Vue的扩展性得以提高，跨平台（UniApp，Weapp）时，不同平台只用实现不同的渲染器即可
- 然后其实真正调用的就是渲染器上的`createApp`方法

## `ensureRenderer`

- 使用了单例模式
- 在创建渲染器之前先判断是否存在
- 核心逻辑是`createRenderer`

## `baseCreateRenderer`

- 渲染器是基于`baseCreateRenderer`的
- 它是个一个2k+行的方法，返回了一个`render`和`createApp`方法，这个`createApp`方法的本质是`createAppAPI`方法

## `createAppAPI`

- 这个方法才是实现c`reateApp`核心逻辑的地方
- 它返回了的是`createApp`方法，这个方法返回一个`app`对象，`app`对象上有我们使用的全局方法（`use`, `component`, `provide`, `mixin`, `mount`, `directive`, `mount`）