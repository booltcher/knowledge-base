import sidebarOfTools from './sidebars/tools'
import sidebarOfVue from './sidebars/vue'
import sidebarOfJS from './sidebars/javascript'
import sidebarOfCSS from './sidebars/css'
import sidebarOfOthers from './sidebars/nocode'
import sidebarOfConfig from './sidebars/config'
import sidebarOfAdvanced from './sidebars/advanced'
import sidebarOfSnippets from './sidebars/snippets'

export default function () {
  return {
    ...sidebarOfJS,
    ...sidebarOfTools,
    ...sidebarOfVue,
    ...sidebarOfCSS,
    ...sidebarOfOthers,
    ...sidebarOfConfig,
    ...sidebarOfAdvanced,
    ...sidebarOfSnippets,
  }
}