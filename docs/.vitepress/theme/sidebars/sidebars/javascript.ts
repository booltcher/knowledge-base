const jsChapter = {
  text: 'JavaScript',
  collapsed: false,
  items: [
    { text: '数据类型', link: '/src/dev/javascript/js-data-type' },
    { text: '深/浅拷贝', link: '/src/dev/javascript/deep-clone' },
  ],
}

const conceptChapter = {
  text: '概念',
  collapsed: false,
  items: [
    { text: '设计模式', link: '/src/dev/javascript/design-mode' },
    { text: 'SOLID', link: '/src/dev/javascript/solid' },
    { text: 'MVVM、MVP和MVC', link: '/src/dev/javascript/mvvm' },
    { text: '纯函数与副作用', link: '/src/dev/javascript/pure-function' },
    { text: '库？框架？', link: '/src/dev/javascript/fw-library' },
  ],
}

export default {
  "/src/dev/javascript/": [
    jsChapter,
    conceptChapter,
  ]
}