<script setup>
const { tags, title, publishDate, timeToRead, path } = defineProps([
  "tags",
  "title",
  "publishDate",
  "timeToRead",
  "path",
]);
const emit = defineEmits(["click"]);

const onClickItem = () => {
  emit("click", path);
};
</script>

<template>
  <div
    @click="onClickItem"
    class="w-80 min-h-20 px-4 cursor-pointer py-2 border-1 border-rd-md border-neutral-3 overflow-hidden pos-relative shadow animate-in fade-in-50 zoom-in-80"
  >
    <div class="text-4 overflow-hidden">
      <div
        class="z-1 pos-relative font-600 text-5 text-overflow-ellipsis overflow-hidden w-full"
      >
        {{ title }}
      </div>
      <div class="flex flex-wrap gap-1 mt-4">
        <div
          class="text-3 px2 py0 wa text-center color-neutral-5 border-1 border-solid border-rd-xl border-neutral-3 text-nowrap"
          v-for="tag in tags"
        >
          {{ tag }}
        </div>
      </div>
      <div class="flex mt-2 flex-items-center">
        <div class="i-mdi:calendar-range text-sm color-indigo"></div>
        <div class="color-neutral-5 text-3 ml-1 mr-3">
          {{ publishDate }}发布
        </div>

        <div class="i-mdi:alpha-a-box text-sm color-indigo"></div>
        <div class="color-neutral-5 text-3 ml-1 mr-3">
          {{ timeToRead.words }}字
        </div>

        <div class="i-mdi:clock-check text-sm color-indigo"></div>
        <div class="color-neutral-5 text-3 ml-1">
          阅读{{ timeToRead.timeToRead }}分钟
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
