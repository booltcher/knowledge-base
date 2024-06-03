import { BookmarkCategory } from "../types"
import { bmOfTools } from "./bmOfTools"
import { bmOfAssets } from "./bmOfAssets"
import { bmOfProgram } from "./bmOfProgram"
import { bmOfTyping } from "./bmOfTyping"

const bm: BookmarkCategory[] = [
  bmOfTools(),
  bmOfProgram(),
  bmOfTyping(),
  bmOfAssets(),
  // bmOfDocs(),
  // bmOfOffical(),
]


export default bm