---
outline: [2, 3]
tags: Vue
publishDate: 2021/07/10
---

# Key的作用和工作原理

> 源码：`src/core/vdom/patch - updateChildren()`

在`patch`阶段，有个方法`sameVnode`来判断两个节点是否是同一节点。

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  )
}
```

而其中两个节点的`key`和`tag`是否相同是主要判断依据。

对于`v-for`的节点来说`tag`都是相同的，所以key决定了两个节点是否相同。

如果相同会被认定为同一个节点而开始做`patch`。

如果没有指定`key` 则会拿到`key` 是`undefined`，而任何两个节点在做对比时，两边的`key`都是`undefined`，而这种情况就会做很多额外的更新操作。

Diff的过程就是通过双指针双向移动，找到相同节点去更新

对于一个例子，在数组中间插入一个新的元素

[a, b, c, d, e]

在a和b 中插入一个f变成[a, f, b, c, d, e]

本来只需要一次节点的创建和插入操作，五次打补丁patch更新(这五次更新其实没有任何变化)

如果没有使用key

在diff时，a->a  b->f c->b d->c e->d

然后再创建一个新的元素e

这会多出很多节点的更新操作(而且每次更新都是整体的重写)

**浪费大量性能**

**而在数据量更大的时候，这种浪费越严重**

### 结论：

- key的作用就是高效地更新虚拟DOM
- 另外，不设置key在列表更新时可能引发一些隐蔽的bug（视图未被正确更新）
- 在做过渡时transition，key未设置有可能也会导致一些过渡效果不会如期实现