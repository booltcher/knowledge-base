import sidebarOfTools from './sidebars/tools'
import sidebarOfVue from './sidebars/vue'
import sidebarOfJS from './sidebars/base'
import sidebarOfOthers from './sidebars/nocode'
import sidebarOfAdvanced from './sidebars/advanced'
import sidebarOfSnippets from './sidebars/snippets'

export default function () {
  return {
    ...sidebarOfJS,
    ...sidebarOfTools,
    ...sidebarOfVue,
    ...sidebarOfOthers,
    ...sidebarOfAdvanced,
    ...sidebarOfSnippets,
  }
}