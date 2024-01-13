import { defineConfig } from "vitepress";
import Unocss from 'unocss/vite'

export default defineConfig({
  head: [['link', { rel: 'icon', href: 'web-logo.svg' }]],
  title: "Booltcher's knowledge base",
  description: "编程/工具/笔记/兴趣",
  base: "/knowledge-base/",
  cleanUrls: true,
  appearance: "dark",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    outline: 'deep',
    logo: "web-logo.svg",
    externalLinkIcon: true,
    nav: [
      { text: "🛖 主页", link: "/" },
      { text: "🌈 不止编程", link: "/markdown-examples" },
      {
        text: '⌨️ 键指如飞',
        link: "/src/tools/flykey/vim/vim-base"
      }
    ],

    sidebar: [
      // {
      //   text: "Examples",
      //   items: [
      //     { text: "Markdown Examples", link: "/test/markdown-examples" },
      //     { text: "Runtime API Examples", link: "/test/api-examples" },
      //   ],
      // },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/booltcher/knowledge-base" },
    ],
  },
  vite: {
    plugins: [
      Unocss(),
    ],
  },
});
