import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import busuanzi from 'busuanzi.pure.js'
import './main.css'
import Layout from "./Layout.vue"
import DocHeader from "./components/DocHeader.vue"
import BracketsText from "./components/BracketsText.vue"
import HighlightText from "./components/HighlightText.vue"
import Tags from "./components/Tags.vue"
import ArticleCard from "./components/ArticleCard.vue"
// import { googleAnalytics } from "../plugins/googleAnalytics"

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // googleAnalytics({
    //   id: 'G-FZQ28TRF5X',
    // })
    // if (inBrowser) {
    //   router.onAfterRouteChanged = (to) => {
    //     busuanzi.fetch()
    //   }
    // }
    app.component('DocHeader', DocHeader)
    app.component('BracketsText', BracketsText)
    app.component('HighlightText', HighlightText)
    app.component('Tags', Tags)
    app.component('ArticleCard', ArticleCard)
  },
}
