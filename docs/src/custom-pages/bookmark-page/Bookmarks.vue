<template>
  <el-row class="h-screen">
    <el-col :span="4" class="">
      <div v-for="menuItem in bookmarks" :key="menuItem.title">
        <div :class="menuItem.icon"></div>
        <!-- <div class="i-material-symbols:15mp-sharp"></div> -->
        <div>{{ menuItem.title }}</div>
      </div>
    </el-col>

    <el-col :span="20"> main</el-col>
  </el-row>
</template>

<script setup lang="ts">
import bookmarks from "./data";
</script>

<style lang="scss" scoped></style>
