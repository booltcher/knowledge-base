---
outline: false
layout: page
---

<script setup>
import { articles as srcArticles, tags as srcTags } from "./tags.json"
import { ref, onMounted, computed } from 'vue';
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

const filteredArticles = computed(() => {
  return articles.value.filter(article => checkedTags.value.every(tag => article.tags.includes(tag)))
})

const navToArticle = (path) => {
  window.location.href = path
}

</script>

<div class="mx-80 py-10 pos-relative">
  <div class="position-fixed h-auto w-60 pl-2 border-l-neutral-2 border-l-1 border-l-solid right-100">
    <h1 class="text-dark font-bolder text-6 pb-4">根据标签过滤</h1>
    <div class="text-3 my-2"><span class="text-indigo font-600 text-5">{{ filteredArticles.length }}</span> 篇满足条件的文章</div>
    <Tags :tags="tagsData" :checkedTags="checkedTags" @clickItem="handleTagClick" />
  </div>

  <div class="w-full pr-80 bg-white">
    <ul class="flex flex-wrap gap-y-4 gap-x-8">
      <li v-for="article in filteredArticles" :key="article.path">
        <ArticleCard :title="article.title" :tags="article.tags" :publishDate="article.publishDate" :path="article.path" :timeToRead="article.timeToRead" @click="navToArticle" />
      </li>
    </ul>
  </div>
</div>
