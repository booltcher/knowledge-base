import DefaultTheme from 'vitepress/theme'
import 'uno.css'
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
    app.component('DocHeader', DocHeader)
  },
}
