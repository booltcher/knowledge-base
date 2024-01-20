<script setup>
defineProps({
  text: {
    type: String,
    default() {
      return "Default function";
    },
  },
  isBold: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
</script>

<template>
  <span :class="{ 'font-bold': isBold }">「{{ text }}」</span>
</template>

<style scoped></style>
