import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './main.css'
import Layout from "./Layout.vue"
import DocHeader from "./components/DocHeader.vue"

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('DocHeader', DocHeader)
  },
}
