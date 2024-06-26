---
outline: [2, 3]
tags: 
  - Vue
  - 源码
publishDate: 2021/07/10
---

# Vue2 Diff算法
> 源码：`src/core/vdom/patch - patch()`

Vue中的VDOM patch是基于Snabbdom库的。

<aside>
💡 Snabbdom是瑞典语**快速的**。在github上核心代码就200行，是用TS写的。

</aside>

diff算法是虚拟DOM技术的必然产物，而虚拟DOM是vue由1向2升级时的必要产物。

绝非Vue专用，涉及到虚拟DOM的一般都会用到。

一个组件调用一次$mount 就会创建一个Watcher实例。

组件中可能存在很多个状态，不知道应该如何更新，也不能全量更新，为了精准定位到变化的节点，将**新老Vnode**做比对，找不同，然后进行更新。

### 必要性

- diff算法是虚拟DOM技术的必然产物，而虚拟DOM是vue由1向2升级时的必要产物。
- vue2中watcher粒度降低，为了精确定位到更新的节点，从而最小量更新DOM
- 如果两棵树进行递归比较，时间复杂度是O(n³)，使用diff算法可以降低到O(n)

### 策略：

- 同层比较，不会跨层比较
- 深度优先
- 确定是同一个虚拟节点才进行精细比较，否则就是删除旧的，插入新的
- 先看两者是否都有孩子，如果有孩子，先去比孩子(递归)，最复杂的情况 - `updateChildren()`
- 只一方有孩子 (批量删除，批量创建)
- 两者都没有子节点 - 文本更新

## 初步比较 -  `patch()`

> patch.ts `#patch()`
> 

首先是初步的比对，这段逻辑主要在`patch()`方法中。这个方法主要两个参数`vnode`和`oldVnode`，即新虚拟DOM和老虚拟DOM。

- 先判断了新的虚拟DOM是否存在，不存在说明这个旧节点要整个删除
- 存在的话再去判断老的虚拟DOM是否存在，如果存在说明要新增整个新的虚拟DOM
- 如果都存在，则判断是否是同一节点，这段逻辑在**`sameVnode`**，同一节点的话就会进入**`patchVnode()`**方法进行精细比较
- 如果两者不是相同节点的话，这种情况一般就是初始化页面，此时**`oldVnode`**其实是真实DOM，这是只需要将**`vnode`**转换为真实DOM然后替换掉**`oldVnode`**

## 精细比较 - `patchVnode()`

> patch.ts `#patchVnode()`
> 

这个方法也是主要两个参数`vnode`和`oldVnode`，即新虚拟DOM和老虚拟DOM。

- 首先判断它们是否全等，全等表示没有任何改动直接`return`
- 更新其属性
- 判断**`vnode.text`**是否存在，即新节点是否是纯文本节点，如果是则只需要更新文本即可
- 不是则需要判断两者的子节点
    - 都有子：执行`updateChildren()`
    - 新有老无：批量创建
    - 新无老有：批量删除
    - 都没有：文本更新

## 对比子节点 - `updateChildren()`

这个方法里就是新老节点组的详细比对。

### 双指针双向移动：

- 如果以上都不满足就会老实进行暴力解法，遍利查找：用新头在旧节点里找key相同的
    - 头尾之间比较
        - 旧头 vs 新头
        - 旧尾 vs 新尾
        - 旧头 vs 新尾
        - 旧尾 vs 新头
    - 存在则把旧节点放在最前
    - 不存在说明新头是要添加的DOM
- 如果有一方遍利完，另一方还剩下
    - 旧剩下：批量删除
    - 新剩下：批量创建