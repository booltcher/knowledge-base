import { defineConfig } from "vitepress";
import Unocss from 'unocss/vite'
import { github } from "./meta";
import sidebars from "./theme/sidebars"
import { MarkdownTransformer } from "./plugins/markdownTransformer";

export default defineConfig({
  head: [['link', { rel: 'icon', href: 'web-logo.svg' }]],
  title: "Booltcher's knowledge base",
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
      { text: "🌈 不止编程", link: "/markdown-examples" },
      {
        text: '⌨️ 键指如飞',
        link: "/src/tools/flykey/vim/vim-base"
      }
    ],
    sidebar: sidebars(),
    socialLinks: [
      { icon: "github", link: `${github}/knowledge-base` },
    ],
    footer: {
      message: `交个朋友互相进步吧？Wechat: _booltcher。或者欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 鼓励一下！`,
    },
  },
  vite: {
    plugins: [
      MarkdownTransformer(),
      Unocss(),
    ],
  },
});
