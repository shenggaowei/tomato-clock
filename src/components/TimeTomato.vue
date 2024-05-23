<template>
  <div @click="handleClickStartCountDown" ref="domRef" :class="style.container">{{ showTimeRef }}</div>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { computed, ref } from "vue";
import useDrag from "../hooks/useDrag";

const domRef = ref<HTMLElement>();
const initTimeRef = ref(25 * 60);

const showTimeRef = computed(() => {
  const minute = Math.floor(initTimeRef.value / 60);
  const second = initTimeRef.value % 60;
  return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
});

const countDown = () => {
  if (initTimeRef.value === 0) {
    interValHandler.pause();
    return;
  }
  initTimeRef.value--;
};

const interValHandler = useIntervalFn(countDown, 1000, { immediate: false });

const handleClickStartCountDown = () => {
  interValHandler.resume();
};

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
