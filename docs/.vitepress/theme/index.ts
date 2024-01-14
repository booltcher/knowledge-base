import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import './main.css'
import Layout from "./Layout.vue"

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
}
