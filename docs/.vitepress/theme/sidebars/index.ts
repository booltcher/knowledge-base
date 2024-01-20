import sidebarOfTools from './tools'
import sidebarOfVue from './vue'

export default function () {
  return {
    ...sidebarOfTools,
    ...sidebarOfVue,
  }
}