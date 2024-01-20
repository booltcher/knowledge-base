import { BookmarkCategory } from "../types";


export const bmOfTools = (): BookmarkCategory => {
  return {
    title: "工具",
    children: [
      { title: "蓝豆", link: "https://www.ldou.com/app/#/appUser/typing/3" },
    ]
  }
}