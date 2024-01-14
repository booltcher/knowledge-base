import type { Plugin } from 'vite'
import { getReadingTime } from '../helpers/getReadingTime'

export function MarkdownTransformer(): Plugin {
  return {
    name: "markdown transformer",
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/) || !id.includes("/docs/src")) return

      const { timeToRead, words } = getReadingTime(code)

      code = code
        .replace(/(#\s.+?\n)/, `$1\n\n<DocHeader timeToRead=${timeToRead} words=${words} />\n`)
      return code
    },
  }
}