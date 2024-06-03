import { BookmarkCategory } from "../types";

export const bmOfProgram = (): BookmarkCategory => {
  return {
    title: "编程",
    icon: "",
    children: [
      { title: "Responsively", link: "https://responsively.app/download", desc: "响应式网站预览器" },
      { title: "Navicat15", link: "https://www.yuque.com/hao6/kkbysk/c1a171de-0ad0-47ee-9aa9-a27cba7e30b6", desc: "Navicat15破解版" },
      { title: "补天", link: "https://www.butian.net/", desc: "漏洞响应平台" },
      { title: "Dev tools", link: "https://smalldev.tools/", desc: "包含各种开发用的小工具箱" },
    ]
  }
}