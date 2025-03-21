const jsChapter = {
  text: 'JavaScript',
  collapsed: false,
  items: [
    { text: '数据类型', link: '/src/dev/base/js-data-type' },
    { text: 'Number', link: '/src/dev/base/primitive-type-number' },
    { text: 'Symbol', link: '/src/dev/base/primitive-type-symbol' },
    { text: '深/浅拷贝', link: '/src/dev/base/deep-clone' },
    { text: '闭包', link: '/src/dev/base/closure' },
    { text: 'JS的单线程', link: '/src/dev/base/single-thread-js' },
    { text: '事件循环', link: '/src/dev/base/event-loop' },
    { text: 'setTimeout', link: '/src/dev/base/set-timeout' },
    { text: '字符串截取', link: '/src/dev/base/slice-string' },
    { text: '<script>加载方式', link: '/src/dev/base/script-load-method' },
    { text: '作用域', link: '/src/dev/base/scope' },
    { text: 'this的绑定', link: '/src/dev/base/bind-this' },
    { text: '原型与原型链', link: '/src/dev/base/proto-chain' },
    { text: '继承', link: '/src/dev/base/inherit' },
    { text: 'Web Worker', link: '/src/dev/base/web-worker' },
    { text: '垃圾回收', link: '/src/dev/base/gc' },
  ],
}

const cssChapter = {
  text: '样式与布局',
  collapsed: false,
  items: [
    { text: '自适应和响应式布局', link: '/src/dev/base/css/responsive-self-adopt' },
    { text: '盒模型', link: '/src/dev/base/css/box' },
    { text: 'BFC', link: '/src/dev/base/css/bfc' },
  ],
}


export default {
  "/src/dev/base/": [
    jsChapter,
    cssChapter
  ]
}