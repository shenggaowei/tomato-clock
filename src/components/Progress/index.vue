<template>
  <div :class="style.container">
    <el-progress :show-text="false" :percentage="50" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const valueRef = ref();
</script>

<style lang="scss" module="style">
.container {
}
</style>
