<script setup>
const { checkedTags } = defineProps(["tags", "checkedTags"]);
const emit = defineEmits(["clickItem"]);

console.log(checkedTags);
function onTagClick(tag) {
  emit("clickItem", tag);
}

function getCheckedClassNames(tag) {
  return checkedTags && checkedTags.includes(tag)
    ? "bg-dark color-neutral-1 hover:color-neutral-3"
    : "bg-gray color-neutral-5 hover:color-neutral-7";
}
</script>

<template>
  <div class="flex flex-items-center gap-2 flex-wrap">
    <div
      v-for="tag in tags || []"
      :key="tag"
      class="ani text-3 px-2 py0 wa text-center rounded-full bd-gray text-nowrap cursor-pointer transition-all duration-300 ease-in-out"
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
</style>
