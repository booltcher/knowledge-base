const jsChapter = {
  text: 'JavaScript',
  collapsed: false,
  items: [
    { text: '数据类型', link: '/src/dev/base/js-data-type' },
    { text: '深/浅拷贝', link: '/src/dev/base/deep-clone' },
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