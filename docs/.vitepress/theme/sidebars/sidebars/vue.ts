const vueBaseChapter = {
  text: '基础篇',
  collapsed: false,
  items: [
    { text: '组件化基础', link: '/src/dev/vue/vue-component' },
    { text: '🔥 组件通信', link: '/src/dev/vue/vue-interaction' },
    { text: 'Vue实例生命周期', link: '/src/dev/vue/vue-instance-lifecycle'},
    { text: '指令', link: '/src/dev/vue/vue-directives' },
    { text: '🔥 v3改动一览', link: '/src/dev/vue/vue3-base' },
    { text: 'Composition API', link: '/src/dev/vue/vue3-composition-api' },
    { text: '侦听器', link: '/src/dev/vue/vue3-watcher'},
    { text: '迁移指南', link: 'https://v3-migration.vuejs.org/zh/' },
  ],
}
const vueCoreChapter = {
  text: '原理篇',
  collapsed: false,
  items: [
    { text: '实例化流程', link: '/src/dev/vue/vue-init'},
    { text: '响应式原理', link: '/src/dev/vue/vue-responsive' },
    { text: '挂载流程', link: '/src/dev/vue/vue-mount'},
    { text: '模板编译', link: '/src/dev/vue/vue-template-compile' },
    { text: 'Diff算法(v2)', link: '/src/dev/vue/vue-diff2' },
    { text: 'Key的作用和工作原理', link: '/src/dev/vue/vue-key' },
    { text: 'Vue中的虚拟DOM', link: '/src/dev/vue/vue-vdom' },
    { text: '为什么组件data必须是函数', link: '/src/dev/vue/vue-data' },
    { text: 'createApp方法的本质', link: '/src/dev/vue/vue3-create-app' },
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
    { text: '导航守卫', link: '/src/dev/vue/vue-router-guard' },
  ],
}

export default {
  "/src/dev/vue/": [
    vueBaseChapter,
    vueCoreChapter,
    storeChapter,
    routerChapter,
  ]
}