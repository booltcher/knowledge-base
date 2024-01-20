const vueBaseChapter = {
  text: '基础篇(Vue2.x)',
  collapsed: false,
  items: [
    { text: 'Vue组件化', link: '/src/dev/vue/vue-component' },
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

const vue3Chapter = {
  text: 'Vue3.x',
  collapsed: false,
  items: [
    { text: 'Vue3概览', link: '/src/dev/vue/vue3-base' },
  ],
}

export default {
  "/src/dev/vue/": [
    vueBaseChapter,
    storeChapter,
    routerChapter,
    vue3Chapter,
  ]
}