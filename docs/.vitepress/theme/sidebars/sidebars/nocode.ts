const englishChapter = {
  text: '🎯 英语',
  collapsed: false,
  items: [
    { text: '简写', link: '/src/nocode/english/short' },
    { text: '近义词', link: '/src/nocode/english/choose' },
    { text: '连读', link: '/src/nocode/english/read' },
    { text: '符号', link: '/src/nocode/english/sign' },
    { text: '1368个单词就够了', link: '/src/nocode/english/1368' },
  ],
}

const bookChapter = {
  text: '📚 读过',
  collapsed: false,
  items: [
    { text: '活着', link: '/src/nocode/book/live' },
    { text: '杀死一只知更鸟', link: '/src/nocode/book/kill-robin' },
    { text: '恶意', link: '/src/nocode/book/spite' },
    { text: '遇见未知的自己', link: '/src/nocode/book/meet-unknown-me' },
    { text: '二次成长', link: '/src/nocode/book/secondary-growth' },
  ],
}

const visualChapter = {
  text: '🎱 视觉',
  collapsed: false,
  items: [
    { text: 'Blender', link: '/src/nocode/visual/blender' },
    { text: 'C4d', link: '/src/nocode/visual/c4d' },
    { text: 'AE', link: '/src/nocode/visual/ae' },
  ],
}

const historyChapter = {
  text: '📜 世界',
  collapsed: true,
  items: [
    { text: '大明', link: '/src/nocode/history/chinese-ming' },
    { text: '丹麦与格陵兰岛', link: '/src/nocode/history/denmark-greenland' },
    { text: '美国', link: '/src/nocode/history/america' },
    { text: '小日子', link: '/src/nocode/history/japan' },
    { text: '印度', link: '/src/nocode/history/india' },
    { text: '抗美援朝', link: '/src/nocode/history/korean-war' },
  ],
  
  
}

const funChapter = {
  text: '🕹️ 玩',
  collapsed: true,
  items: [
    { text: '客制化键盘', link: '/src/nocode/fun/keyboard' },
    { text: '积木', link: '/src/nocode/fun/brick' },
    { text: '高达', link: '/src/nocode/fun/gundam' },
    { text: '实木与板材', link: '/src/nocode/fun/wood' },
  ],
}

export default {
  "/src/nocode/": [
    englishChapter,
    visualChapter,
    bookChapter,
    historyChapter,
    funChapter,
  ]
}