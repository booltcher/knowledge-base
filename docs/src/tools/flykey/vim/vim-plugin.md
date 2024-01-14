---
tags: Tools Vim
publishDate: 2023/02/24
---
# Vim（三）VS Code下Vim的插件

---

## 🏴‍☠️ Vim Easy Motion

增强与 vim 的一般操作，更为方便。

> 支持的操作:
>
> - s 查找所有字符
> - f 向下查找字符
> - hjkl 移动
> - w 单词

**开启增强模式**

```html
<leader><leader></leader></leader>
```

## 🏴‍☠️ Vim Surround

---

包裹功能。

**添加包裹`ys`**

- 括号包裹单词 `ysiw]`
- 标签包裹单词 `ysiwtp`
- 包裹至行尾 `ys$`
- 包裹整行 `yss`
- 可视模式下，`St` 可以直接添加包裹

**删除包裹**

- `dsb`
- `dsB`

## 🏴‍☠️ Vim Commentary

---

快捷注释。

在选中模式下

- `gcc` 注释当前行
- `gc` 行注释
- `gC` 块注释

## 🏴‍☠️ Vim Sneak

---

搜索强化。

- 使用 s 替换 f
- 使用 S 替换 F
- 使用 cl 替换 s
- 使用^C 替换 S

## 🏴‍☠️ Vim Intend Object

---

扩展了 Vim 原本的文本标记符。

使用 `i` (intend)表示选中同级的缩进。对于 python 类缩进语法的语言很有用，JS 可以用来删除函数。

- `i`
- `I`

## 🏴‍☠️ Vim Text Object Entire

---

扩展了 Vim 原本的文本标记符。

使用 `e` (entire)表示选中全部文档。

- `e`
- `E`

## 🏴‍☠️ Vim Text Object Arguments

---

扩展了 Vim 原本的文本标记符。

使用 `a` (arguments)表示选中参数。

- `aa` 包括符号
- `ia` 不包括符号

# 技巧

---

## 🎩 VSCodeVim tricks!

VS Code has a lot of nifty tricks and we try to preserve some of them:

- `gd` - jump to definition.
- `gq` - on a visual selection reflow and wordwrap blocks of text, preserving commenting style. Great for formatting documentation comments.
- `gb` - adds another cursor on the next word it finds which is the same as the word under the cursor.
- `af` - visual mode command which selects increasingly large blocks of text. For example, if you had "blah (foo [bar 'ba|z'])" then it would select 'baz' first. If you pressed `af` again, it'd then select [bar 'baz'], and if you did it a third time it would select "(foo [bar 'baz'])".
- `gh` - equivalent to hovering your mouse over wherever the cursor is. Handy for seeing types and error messages without reaching for the mouse!