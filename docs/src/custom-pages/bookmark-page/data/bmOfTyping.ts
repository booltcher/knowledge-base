import { BookmarkCategory } from "../types";

export const bmOfTyping = (): BookmarkCategory => ({
  title: "打字",
  icon: "",
  children: [
    { title: "蓝豆", link: "https://www.ldou.com/app/#/appUser/typing/3" },
    { title: "Typing Practice", link: "https://www.keybr.com/", desc: "可自定义键位" },
    { title: "dazidazi", link: "https://dazidazi.com/?utm_source=xinquji" },
    { title: "双拼练习", link: "https://api.ihint.me/shuang/" },
    { title: "字帖", link: "https://api.ihint.me/zi/" },
    { title: "Qwerty", link: "https://qwerty.kaiyi.cool/", desc: "英文单词" },
    { title: "Typingio", link: "https://typing.io/lesson/javascript/jquery/traversing.js/1", desc: "包含编程练习" },
    { title: "fastfingers", link: "https://10fastfingers.com/", desc: "打字测速" },
    { title: "Typlet", link: "https://www.typelit.io/", desc: "英文小说" },
  ],
})
