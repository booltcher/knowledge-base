---
outline: [2, 3]
tags: 
  - Vue 
  - Vue Router
publishDate: 2021/07/26
---

# 路由基础

## `Route`对象

在单页应用中，路由就是描述<BracketsText text="UI" /> 与 <BracketsText text="URL" />之前的映射关系。
核心就是如何<HighlightText text="局部刷新" /> 和 <HighlightText text="监听URL的变化" />。

路由：一组`key`（路径）`value`（UI） 的对应关系

路由器：用于管理多组路由

- `path`
- `params`
- `query`
- `hash`
- `fullPath`
- `matched`
- `name`
- `redirectedFrom`

## 路由传参 🔥

- 两种方式：`query`和`params`
- `params`是路由的一部分，`query`是 URL 后面的参数
- 如果提供了`path`就会忽略`params`
::: info 🧶
在[2022 年 8 月的一次更新中](https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22)，`params`传参必须在`routes`中定义动态路由匹配。那如果想隐式路由传参，可以使用下面几种方式：

 1. 全局状态管理(Vuex, Pinia)
 2. 使用 HistoryAPI
 3. 放在`to.meta`里
:::
总结，使用`params`路由传参两个注意点：

- 使用`name`而不是`path`
- 要在路由定义中设置好占位（动态路由匹配）

## 编程式导航

有一些`<RouterLink />`不能满足的场景，比如<BracketsText text="判断条件" />，<BracketsText text="自动跳转，" /><BracketsText text="非点击操作" />等，这些情况就要用到编程式导航。

借鉴了`window.history`的 API。

导航方法在各类路由模式下表现一致：`history`、 `hash`  和  `abstract`

### `router.push`

`router-link`的`to`属性底层也会调用`router.push()` 都会向`history`栈添加一个新的记录。

### `router.replace`

和`push`的差别就是不会向`history`栈中添加新的路由信息，而是替换掉当前

`push`和`replace`方法都可以接受三个参数，后两个参数分别是：`onComplete?, onAbort?`

将会在导航成功完成 (在所有的异步钩子被解析之后)

或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

### `router.go`

参数是一个整数，表示在`history`记录中向前或后退多少步。类似于`window.history.go(n)`

## 路由元信息

在路由表中使用`meta`设置。使得路由在定义时就自带一些信息。

## 重定向与别名

- 重定向：通过设置`redirect`字段。在访问`/a`时实际去访问了`/b`，路径也是`/b`
- 别名：通过设置`alias`属性。在访问`/b`时，实际上路由匹配到的和访问的是`/a`，但是路径还是`/b`

## 公用组件

### `router-link`

默认会渲染为一个`a`标签，并在子元素里找到第一个`a`标签为其绑定`href`和事件监听器。如果子元素里没有`a`标签会将事件绑定在自身上。

可以使用`active-class` 属性为其设置链接激活时的样式类名，或者在构建时传入选项`linkActiveClass`。

### `router-view`

- 是一个函数式组件
- 可以嵌套使用
- 可以配合`<transition>`实现一些过渡效果
- 可以配合`<keep-alive>`实现视图的缓存

## 模式

一般 toC 的应用都会使用`history`模式，不是因为<BracketsText text="#" />不美观，而是`hash`模式的 SEO 优化不如`history`。对于后台管理应用其实无所谓了 🤷。
默认情况使用`hash`模式，如果没有浏览器 API 就会强制进入`abstract`模式。

### 不同模式局部刷新原理 🔥

- `hash`表示锚点，虽然会出现在 URL 中, 但是不会被包含在请求中，因此`hash`值改变不会重新加载页面，而且`hash`改变会触发`hashchange`事件，可以通过监听它来切换到对应视图。
- `history`中的`pushState()`和`replaceState()`两个方法完成 URL 跳转不会重新加载页面，只会更新 URL 和浏览器历史记录。

::: warning 🌋
**v2.8 版本之前：**

`hash`模式主要监听的事件是`hashchange`，且导航方法主要通过操作`window.location(hash/href)`来实现。

**而从 2.8 版本之后：**

如果环境支持<BracketsText text="History API" /> 就会和 `history` 模式一样，在底层调用 <BracketsText text="History API" /> 来实现。

- `history.pushState/replaceState`
- `history.back/go`
:::


### History 模式存在的问题

要注意 404 的问题，因为在`history`模式下，只是动态的通过 JS 操作`window.history`来改变浏览器地址栏里的路径，并没有发起 HTTP 请求，当直接在浏览器里输入这个地址的时候，就一定会对服务器发起 HTTP 请求，但是这个目标在服务器上又不存在，所以会返回 404。

所以要在 Ngnix 中将所有请求都转发到 index.html 上就可以了。

### Abstract 模式

Vue Router 不会依赖于浏览器提供的 API（比如 `history` 或 `hash` 模式）。相反，它会使用一种通用的路由管理方法。一般在移动端原生环境使用，比如 weex 项目。`abstract` 模式为开发人员提供了更大的灵活性，使他们能够更轻松地将 Vue Router 集成到各种不同的应用程序中，不受特定浏览器 API 的限制。

## 命名视图

如果要在同一级展示多个视图，可以为`router-view`加上`name`属性来指定显示的视图名，然后在路由配置里使用`components`属性来设置，没有`name`的`router-view`等同于`name`设置为`default`。

```js
const router = new VueRouter({
  routes: [
    {
      path: "/",
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      },
    },
  ],
});
```

## 路由与组件解耦(路由组件传参)

如果在组件中直接通过`$route`去访问路由传的参数，就会将组件和路由形成高度耦合。

我们希望组件还依旧是通过`props`接受外来参数，可以设置路由的`props`属性来实现：

- 布尔值：`true`表示将`$route.params`作为参数传给组件
- 对象：适用于静态值，原原本本传给组件
- 函数：可以返回一个对象，方法入参是`route`

## 路由懒加载

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo");
```

并可以通过魔法注释定义`chunk`名。

## 动态路由

`router.addRoutes()`

## 打开新窗口

```js
const obj = {
  path: xxx, //路由地址
  query: {
    mid: data.id, //可以带参数
  },
};
const { href } = this.$router.resolve(obj);
window.open(href, "_blank");
```

## 平滑滚动

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  }
}
```

## Vue.Router 简易实现 🔥

### 需要做的事

- 对象上实现`install` 方法
- `Vue.mixin()`在每一个 Vue 实例的 `beforeCreate` 生命周期混入两个描述路由信息的属性，[`$route`和`$router`](#route对象)，并把`$route` 定义为一个响应式属性
- 全局注册两个组件 `router-view`，`router-link`

### 如何监听路由变化

- `hash` 模式：`hashchange`
- 前进后退 a 标签改变 URL
- `window.location` 改变 URL
- `history` 模式：`popstate`
- 前进后退 `pushState/replaceState`
- `history` 的 `go`，`back`，`forword` 方法

```js
import Vue from "vue";
class VueRouter {
  constructor(options) {
    //1.保存路由选项
    this.$options = options;
    //这个方法会给一个对象设置一个响应式的值
    Vue.util.defineReactive(
      this,
      current,
      window.location.hash.slice(1) || "/"
    );

    //2.监控hash的变化
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
    });
  }
}
VueRouter.install = function (_Vue) {
  Vue = _Vue;
  //1.实现$router，每个实例都能访问到
  //Vue.prototype.$router = router(需要延迟执行，方法调用的时候没有实例化，延迟到router实例和vue实例都创建完毕)
  //使用混入：Vue.mixin({})
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        //如果存在说明当前是根实例 $options可以得到组件的配置
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  //2.实现两个全局组件router-view和router-link
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    // h函数返回的是vdom
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", {
    render(h) {
      let component = null;
      //1.获取当前url的hash部分
      //2.根据hash部分从路由表中获取对应的组件
      const route = this.$router.$options.routes.find(
        (route) => routes.path === this.$router.current
      );
      if (route) {
        component = route.component;
      }
      return h(component);
    },
  });
};

export default VueRouter;
```
