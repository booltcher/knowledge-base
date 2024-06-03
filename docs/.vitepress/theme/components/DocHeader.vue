<script setup>
import { reactive, computed } from "vue";
import { useData } from "vitepress";
import { getUnknownValue } from "../../helpers/getUnknownValue";
import { getRelativeTime } from "../../helpers/date";
import Tags from "./Tags.vue";

const { timeToRead } = defineProps(["timeToRead"]);

const pageData = useData();
const { frontmatter, page } = pageData;
const headerTags = reactive(frontmatter.value.tags);
const lastUpdatedDate = computed(() => getRelativeTime(page.value.lastUpdated));

let headAttributes = reactive([
  {
    key: "publishDate",
    iconClass: "i-solar:calendar-outline",
    value: `发表于${getUnknownValue(frontmatter.value.publishDate)}`,
  },
  {
    key: "lastUpdatedDate",
    iconClass: "i-solar:adhesive-plaster-2-outline",
    value: `最后更新于${lastUpdatedDate.value}`,
  },
  // {
  //   key: "seenCount",
  //   iconClass: "i-solar:eye-outline",
  //   value: `${getUnknownValue(seenCount).toLocaleString()}`,
  // },
  {
    key: "timeToRead: ",
    iconClass: "i-solar:clock-circle-outline",
    value: `阅读${getUnknownValue(timeToRead)}分钟`,
  },
]);
</script>

<template>
  <div class="mt-4">
    <div class="flex gap-6 flex-items-center mb-2">
      <div
        class="flex gap-2 flex-items-center color-gray"
        v-for="attr in headAttributes"
        :key="attr.key"
      >
        <div :class="attr.iconClass"></div>
        <div class="text-3">{{ attr.value }}</div>
      </div>
    </div>
    <div class="flex gap-2 flex-items-center">
      <div class="i-ph:tag-bold color-gray"></div>
      <div class="flex gap-2 flex-items-center">
        <Tags :tags="headerTags" />
      </div>
    </div>
  </div>
</template>
