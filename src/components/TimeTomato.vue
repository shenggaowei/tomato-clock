<template>
  <div ref="domRef" :class="style.container">测试</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useDrag from "../hooks/useDrag";

const domRef = ref<HTMLElement>();

useDrag(domRef);
</script>

<style lang="scss" module="style">
.container {
  width: 70px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.95);
  overflow: hidden;
  cursor: pointer;
  color: red;
  user-select: none;
}
</style>
