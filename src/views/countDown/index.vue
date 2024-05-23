<template>
  <div ref="domRef" :class="style.container">
    <div :class="style.showTime">{{ showTimeRef }}</div>
    <StartComponent
      v-if="!interValHandler.isActive.value"
      @on-click-start="handleClickStartCountDown"
      :class="style.maskContent"
    />
    <PauseComponent v-else @on-click-pause="handleClickPauseCountDown" :class="style.maskContent" />
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
import { computed, ref } from "vue";
import useDrag from "../../hooks/useDrag";
import PauseComponent from "./components/pause.vue";
import StartComponent from "./components/start.vue";

const defaultTime = 1 * 10;
const domRef = ref<HTMLElement>();
const initTimeRef = ref(defaultTime);

const showTimeRef = computed(() => {
  const minute = Math.floor(initTimeRef.value / 60);
  const second = initTimeRef.value % 60;
  return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
});

const countDown = () => {
  if (initTimeRef.value === 0) {
    interValHandler.pause();
    window.ipcRenderer.send("showNotification");
    return;
  }
  initTimeRef.value--;
};

const interValHandler = useIntervalFn(countDown, 1000, { immediate: false });

const handleClickStartCountDown = () => {
  interValHandler.resume();
};

const handleClickPauseCountDown = () => {
  interValHandler.pause();
};

useDrag(domRef);
</script>

<style lang="scss" module="style">
.container {
  width: 70px;
  height: 34px;
  background: rgba(255, 255, 255, 0.95);
  user-select: none;
  overflow: hidden;
  position: relative;
  border-radius: 4px;

  .showTime {
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 34px;
    font-size: 16px;
    font-weight: 600;
  }

  &:hover .maskContent {
    visibility: visible;
    opacity: 1;
  }

  .maskContent {
    transition: visibility 0s, opacity 0.3s linear;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
