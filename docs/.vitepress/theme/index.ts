import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import busuanzi from 'busuanzi.pure.js'
import './main.css'
import Layout from "./Layout.vue"
import DocHeader from "./components/DocHeader.vue"
import { googleAnalytics } from "../plugins/googleAnalytics"

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    googleAnalytics({
      id: 'G-FZQ28TRF5X',
    })
    if (inBrowser) {
      router.onAfterRouteChanged = (to) => {
        busuanzi.fetch()
      }
    }
    app.component('DocHeader', DocHeader)
  },
}
