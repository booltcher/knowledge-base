import sidebarOfTools from './tools'
import sidebarOfVue from './vue'
import sidebarOfJS from './javascript'
import sidebarOfCSS from './css'
import sidebarOfOthers from './nocode'

export default function () {
  return {
    ...sidebarOfJS,
    ...sidebarOfTools,
    ...sidebarOfVue,
    ...sidebarOfCSS,
    ...sidebarOfOthers,
  }
}