<script setup>
defineProps(["tags"]);
</script>

<template>
  <div class="flex flex-items-center gap-2">
    <div
      v-for="tag in tags"
      :key="tag"
      class="text-3 px-2 py0 wa text-center rounded-full bg-gray color-neutral-5 bd-gray"
    >
      {{ tag }}
    </div>
  </div>
</template>

<style>
.bg-gray {
  background-color: #efefef;
}
</style>
