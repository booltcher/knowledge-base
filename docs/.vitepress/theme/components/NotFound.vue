<template>
  <div class="flex flex-items-center justify-center flex-col py-24">
    <img class="w-md" src="../../../public/404.svg" alt="Page not found" />
    <div class="text-5 font-bold text-spacing my-6">PAGE NOT FOUND</div>
    <div class="text-4">
      <span class="font-oblique color-primary font-bold">开发中</span
      >或URL有误，抱歉 🫥
    </div>
    <a
      class="border-primary color-primary rd-full px-4 py-1 text-3 mt-5"
      :href="homePath"
      >返回主页</a
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import { withBase } from "vitepress";
const homePath = ref(withBase("/"));
</script>

<style scoped></style>
