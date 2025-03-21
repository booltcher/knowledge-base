<script setup>
const { checkedTags } = defineProps(["tags", "checkedTags"]);
const emit = defineEmits(["clickItem"]);

function onTagClick(tag) {
  emit("clickItem", tag);
}

function getCheckedClassNames(tag) {
  return checkedTags && checkedTags.includes(tag)
    // ? "bg-dark color-neutral-1 hover:color-neutral-3"
    ? "vitepress-checked-tag"
    : "bg-gray color-neutral-5 hover:color-neutral-7";
}
</script>

<template>
  <div class="flex flex-items-center gap-2 flex-wrap">
    <div
      v-for="tag in tags || []"
      :key="tag"
      class="text-3 px-2 py0 wa text-center rounded-full bd-gray text-nowrap cursor-pointer transition-all duration-300 ease-in-out"
      :class="getCheckedClassNames(tag)"
      @click="onTagClick(tag)"
    >
      {{ tag }}
    </div>
  </div>
</template>

<style>
.bg-gray {
  background-color: #efefef;
}
.vitepress-checked-tag {
  background: var(--vp-c-indigo-3);
  color: var(--vp-c-white)
}
</style>
