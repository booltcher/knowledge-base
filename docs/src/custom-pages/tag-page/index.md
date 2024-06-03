---
outline: false
layout: doc
---

<script setup>
import { articles as srcArticles, tags as srcTags } from "./tags.json"
import { ref, onMounted } from 'vue';
const tagsData = ref(srcTags);
const articles = ref(srcArticles);
const checkedTags = ref([])

const getArticlesByTag = (tag) => {
  return articles.value.filter(article => article.tags.includes(tag))
};

const handleTagClick = (tag) => {
  const index = checkedTags.value.indexOf(tag)
  index === -1 ? checkedTags.value.push(tag) : checkedTags.value.splice(index, 1)
}

const getArticlesByCheckedTag = () => {
  const arr = articles.value.filter(article => checkedTags.value.every(tag => article.tags.includes(tag)))
  return arr
}
</script>

  <h1>根据标签过滤</h1>

<Tags :tags="tagsData" :checkedTags="checkedTags" @clickItem="handleTagClick" />

<div>
  <ul>
    <li v-for="article in getArticlesByCheckedTag()" :key="article.path">
      {{ article.title }}
    </li>
  </ul>
</div>
