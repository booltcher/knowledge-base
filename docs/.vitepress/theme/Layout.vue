<script setup>
import DefaultTheme from "vitepress/theme";
import DocHeader from './components/DocHeader.vue'

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-before>
      <DocHeader />
    </template>
  </Layout>
</template>
