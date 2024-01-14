---
tags: Tools Vim
publishDate: 2023/02/24
---
# Vim（四）场景与用法

## 🎩 VSCodeVim tricks!

VS Code has a lot of nifty tricks and we try to preserve some of them:

- `gd` - jump to definition.
- `gq` - on a visual selection reflow and wordwrap blocks of text, preserving commenting style. Great for formatting documentation comments.
- `gb` - adds another cursor on the next word it finds which is the same as the word under the cursor.
- `af` - visual mode command which selects increasingly large blocks of text. For example, if you had "blah (foo [bar 'ba|z'])" then it would select 'baz' first. If you pressed `af` again, it'd then select [bar 'baz'], and if you did it a third time it would select "(foo [bar 'baz'])".
- `gh` - equivalent to hovering your mouse over wherever the cursor is. Handy for seeing types and error messages without reaching for the mouse!

## 重复修改

### 案例： 删除多个单词

> 只在必要时使用次数

- 使用`dw` 随后使用. 可以随意修补次数不用计算
- `d3w` `3dw` 计算是麻烦的，是不准确的，也是不便于去补救的，但是修改记录是完整的

### 案例： 为每一行末尾加上分号

#### 1. 方案 1：重复操作

- `A` 跳转至行尾并进入插入模式
- `;` 修改文件
- `Esc` 退出插入模式
- `j` . 重复修改

#### 2. 方案 2：列选择模式

- `ctrl + v` 进入列选择模式
- `$` 跳转到行尾
- `A` 切换到插入模式输入;

### 案例： 将文件内多处单词修改为新的单词

> 使用全局替换是比较危险的，我们更希望由我们自己去控制每一处的修改

#### 方案 1：使用 vim 操作

- `s` 单词开始字符{L} 索引
- `*` 将当前单词高亮标记，如果未高亮，说明需要设置`:set hls`
- `cwsmall` - 修改单词
- `Esc` - 退出插入模式
- `n` 跳到下一处
- `.` 重复修改

#### 方案 2：借助 VS Code 快捷键

- `s` 单词开始字符{L} 索引
- `command + d` 每次高亮标记并选中一个和当前光标所在单词相同的(严格相同)单词
- `c` 修改

### 案例：多参数函数常用操作

使用 arguments object 更加方便

- `f(ldf,x` 删除第一个参数
- `f(lct,` 修改第一个参数
- `f,;;;ldf,` 分号的个数是参数的序号减去 2，第 3 个是 1，第 4 个是 2
- `f)dF,` 修改最后一个参数
- `f)cT,`

### 案例：删除下半句话

```
f,dt.
```

### 案例：删除一部分文本

用搜索功能比较精准 d 后面跟搜索，不包含 char

```
d/{char}
```

### 案例：插入时重新绘制

在输入的时候，当前行到了最后一行，可以使用 ctrl + o zz 使得屏幕重新绘制，同时可以继续插入 -->
