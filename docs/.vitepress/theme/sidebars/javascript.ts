const jsChapter = {
  text: 'JavaScript',
  collapsed: false,
  items: [
    { text: '数据类型', link: '/src/javascript/js-data-type' },
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

const implementChapter = {
  text: '手写',
  collapsed: false,
  items: [
    { text: '手写发布订阅', link: '/src/dev/javascript/implement/implement-pubsub' },
    { text: '手写单例模式', link: '/src/dev/javascript/implement/implement-singleton' },
  ],
}


export default {
  "/src/dev/javascript/": [
    jsChapter,
    conceptChapter,
    implementChapter,
  ]
}