import { defineConfig } from "vitepress";
import Unocss from 'unocss/vite'
import { github } from "./meta";
import sidebars from "./theme/sidebars"
import { MarkdownTransformer } from "./plugins/markdownTransformer";
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver'
import UnocssIcons from '@unocss/preset-icons'

export default defineConfig({
  head: [['link', { rel: 'icon', href: 'web-logo.svg' }]],
  title: "Knowledge base",
  description: "编程/工具/笔记/兴趣",
  base: "/knowledge-base/",
  cleanUrls: true,
  appearance: "dark",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  locales: {
    root: { label: '简体中文', lang: 'zh-CN' },
  },
  themeConfig: {
    lastUpdatedText: '最后一次更新于',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    outlineTitle: '大纲',
    outline: 'deep',
    logo: "web-logo.svg",
    externalLinkIcon: true,
    nav: [
      { text: "主页", link: "/" },
      {
        text: "编程", items: [
          { text: 'JavaScript', link: '/interview/' },
          { text: 'Vue', link: '/algorithm/guide/' },
          { text: 'React', link: '/patterns/guide/' },
          { text: 'CSS', link: '/patterns/guide/' },
          { text: '架构', link: '/patterns/guide/' },
          { text: '业务', link: '/patterns/guide/' },
          { text: '服务端', link: '/patterns/guide/' },
        ],
      },
      { text: "🌈 不止编程", link: "/markdown-examples" },
      {
        text: '⌨️ 键指如飞',
        link: "/src/tools/flykey/vim/vim-base"
      },
      {
        text: '🔥 网站收藏',
        link: "/src/bookmarks/index"
      }
    ],
    sidebar: sidebars(),
    socialLinks: [
      { icon: "github", link: `${github}/knowledge-base` },
    ],
    footer: {
      message: `欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 鼓励一下！`,
    },
  },
  vite: {
    plugins: [
      MarkdownTransformer(),
      Components({
        resolvers: [
          IconsResolver({
            prefix: "i",
          }),
        ]
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        defaultStyle: 'display: inline-block',
      }),
      Unocss({
        presets: [
          UnocssIcons({
            prefix: 'i',
            extraProperties: {
              display: 'inline-block'
            }
          }),
        ],
      }),
    ],
  },
});
