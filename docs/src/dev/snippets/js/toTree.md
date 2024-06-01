---
outline: [2, 3]
tags: JavaScript 代码片段 工具方法
publishDate: 2021/09/21
---

# <数组> 生成树

## 递归(n²)

```js
/**
 * @params {Array} items 源数据
 * @params {String} link 生成树依据的属性名，默认'parent_id'
 * @returns result 树状对象
 * @description 依据link属性，将扁平数据转化为树状结构
 */
const arrayTree = (items, id = null, link = "parent_id") =>
  items
    .filter((item) => item[link] === id)
    .map((item) => ({ ...item, children: arrayTree(items, item.id) }));
export default arrayTree;

/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
};

/**
 * 转换方法
 */
const toTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid);
  return result;
};
```

## Map(2n)

```js
function toTree(items) {
  const result = []; // 存放结果集
  const itemMap = {}; //

  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }

  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
```

## Map(n)

```js
function toTree(items) {
  const result = []; // 存放结果集
  const itemMap = {}; //
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]["children"],
    };

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
```
