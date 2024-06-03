---
outline: [2, 3]
tags: 
  - Vue 
  - Vue Router
publishDate: 2024/03/20
---

# 导航守卫
路由导航守卫都是在Vue实例生命周期钩子函数之前执行的。

## 全局守卫
- 全局前置守卫 `router.beforeEach`：是否可以跳转：身份验证、路由权限验证、条件性路由重定向等任务
- 全局解析守卫 `router.beforeResolve`：导航被确认前的最后一个钩子，异步路由组件已经加载完，可以实现数据预加载
- 全局后置守卫 `router.afterEach`：埋点统计，日志打点，滚动条初始化，动态页面标题等

参数：

- `to` 值为`Route`对象
- `from` 值为`Route`对象
- `next` 后置守卫无该参数。`next`只能被调用一次，所以最好写进判断语句里。
    - `next()` 导航继续，进入下一个钩子
    - `next(false)` 中断导航
    - `next(’/’)` 或 `next({ path: ‘/’})` 当前导航中断，开始一个新的导航
    - `next(error)` 终止导航并报错

## 路由独享守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

## 组件内路由守卫

它们的参数和全局前置守卫相同。

### `beforeRouteEnter`

在渲染该组件的对应路由被 confirm 前调用，不！能！获取组件实例 `this`，因为当守卫执行前，组件实例还没被创建。

### `beforeRouteUpdate`

在当前路由改变，但是该组件被复用时调用。

举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
可以访问组件实例 `this`

### `beforeRouteLeave`

导航离开该组件的对应路由时调用。
可以访问组件实例 `this`。

## 完整导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 如何在组件中监听路由参数变化？

1. `watch`

```js
watch: {
    '$route'(to, from) {
        //这里监听
    },
},
```

1. 钩子

```js
beforeRouteUpdate (to, from, next) {
    //这里监听
},
```

### 切换路由后怎么保持原来的位置或滚动到顶部？

通过为`Router`实例设置`scrollBehavior`属性，它是一个方法，方法的第三个参数表示原来的位置，可以通过`return`一个包含着`x`轴`y`轴坐标的对象来设置滚动条位置。

```jsx
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
```

### `beforeResolve`和`beforeEach`的差别：

参考[完整导航解析流程](https://www.notion.so/e94c7f0334f049d49ee6ad5fc6c0dd49?pvs=21)