const visualChapter = {
  text: '🎱 视觉',
  collapsed: false,
  items: [
    { text: 'blender', link: '/src/nocode/blender' },
    { text: 'C4d', link: '/src/nocode/c4d' },
    { text: 'AE', link: '/src/nocode/ae' },
  ],
}

const funChapter = {
  text: '🕹️ 玩',
  collapsed: false,
  items: [
    { text: '客制化键盘', link: '/src/nocode/keyboard' },
    { text: '积木', link: '/src/nocode/block' },
    { text: '高达', link: '/src/nocode/gundam' },
    { text: '实木与板材', link: '/src/nocode/wood' },
  ],
}

export default {
  "/src/nocode/": [
    visualChapter,
    funChapter,
  ]
}