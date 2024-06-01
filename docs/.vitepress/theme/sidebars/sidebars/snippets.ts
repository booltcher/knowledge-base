const jsSnippetsChapter = {
  text: 'JavaScript代码片段',
  collapsed: false,
  items: [
    { text: '防抖', link: '/src/dev/snippets/js/debounce' },
    { text: '节流', link: '/src/dev/snippets/js/throttle' },
    { text: '深冻结', link: '/src/dev/snippets/js/deepFreeze' },
    { text: '手写发布订阅', link: '/src/dev/snippets/js/pubsub' },
    { text: '手写单例模式', link: '/src/dev/snippets/js/singleton' },
    { text: '生成随机颜色', link: '/src/dev/snippets/js/genRandomColor' },
    { text: '解析路径参数', link: '/src/dev/snippets/js/parseParams' },
    { text: '常见正则', link: '/src/dev/snippets/js/sharedRegExp' },
    { text: '货币格式化', link: '/src/dev/snippets/js/toCurrency' },
    
    { text: '<数组> 生成树', link: '/src/dev/snippets/js/toTree' },
    { text: '<日期> 间隔天数', link: '/src/dev/snippets/js/daysBetweenDates' },
    { text: '<图片> 下载Base64', link: '/src/dev/snippets/js/downloadBase64Img' },
    { text: '<图片> 剪裁', link: '/src/dev/snippets/js/clipImage' },
    { text: '<图片> 懒加载', link: '/src/dev/snippets/js/imgLazyLoad' },
    { text: '<文件> 格式化尺寸', link: '/src/dev/snippets/js/bytesToSize' },
    { text: '<文件> 获取类型', link: '/src/dev/snippets/js/getFileType' },
  ],
}

const cssSnippetsChapter = {
  text: 'CSS代码片段',
  collapsed: false,
  items: [
    { text: '文本溢出', link: '/src/dev/snippets/css/text-overflow' },
    { text: '隐藏数字输入框按钮', link: '/src/dev/snippets/css/hide-number-input-btn' },
    { text: '滚动条样式', link: '/src/dev/snippets/css/scrollbar' },
  ],
}



export default {
  "/src/dev/snippets/": [
    jsSnippetsChapter,
    cssSnippetsChapter,
  ]
}