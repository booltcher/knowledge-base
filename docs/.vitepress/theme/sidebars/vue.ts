const vueCoreChapter = {
  text: 'Core',
  collapsed: false,
  items: [
    { text: 'Vue组件化基础', link: '/src/dev/vue/vue-component' },
    { text: '🔥 组件通信', link: '/src/dev/vue/vue-interaction' },
  ],
}
const storeChapter = {
  text: '状态管理篇',
  collapsed: false,
  items: [
    { text: 'Vuex基础', link: '/src/dev/vue/vuex-base' },
  ],
}
const routerChapter = {
  text: '路由篇',
  collapsed: false,
  items: [
    { text: '路由基础', link: '/src/dev/vue/vue-router-base' },
  ],
}

export default {
  "/src/dev/vue/": [
    vueCoreChapter,
    storeChapter,
    routerChapter,
  ]
}