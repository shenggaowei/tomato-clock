<template>
  <div :class="style.container">
    <div :class="style.showTime">
      {{ showTimeRef }}
    </div>
    <Pause
      v-show="tomatoState === ETomatoState.Timing"
      @on-click-pause="handleClickPauseCountDown"
      @on-click-reset="handleClickReset"
      :class="style.maskContent"
    />
    <Play
      v-show="tomatoState === ETomatoState.PAUSE || tomatoState === ETomatoState.INIT"
      @on-click-start="handleClickStartCountDown"
      :class="style.maskContent"
    />
    <FinishComponent
      @on-click-start-from-start-time="handleClickStartCountDownFromStartTime"
      @on-click-start-rest="emits('on-click-start-rest')"
      v-show="tomatoState === ETomatoState.Finish"
    />
  </div>
</template>

<script setup lang="ts">
import { tomatoConfig } from "@/utils/const";
import { ETomatoState, ETomatoType } from "@/utils/type";
import { useIntervalFn } from "@vueuse/core";
import { computed, ref } from "vue";
import FinishComponent from "./components/finish.vue";
import Pause from "./components/pause.vue";
import Play from "./components/play.vue";

interface IEmits {
  (e: "on-click-start-rest"): void;
}

const emits = defineEmits<IEmits>();

const { duration } = tomatoConfig[ETomatoType.CountDown];
const initTimeRef = ref(duration);
const tomatoState = ref(ETomatoState.INIT);

const showTimeRef = computed(() => {
  const minute = Math.floor(initTimeRef.value / 60);
  const second = initTimeRef.value % 60;
  return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
});

// 倒计时结束回调
const countDownFinishCallback = () => {
  if (initTimeRef.value === 0) {
    tomatoState.value = ETomatoState.Finish;
    interValHandler.pause();
    initTimeRef.value = duration;
    window.ipcRenderer.send("showNotification", {});
    return;
  }
  initTimeRef.value--;
};

// 轮训倒计时
const interValHandler = useIntervalFn(countDownFinishCallback, 1000, { immediate: false });

// 开启计时器
const handleClickStartCountDown = () => {
  interValHandler.resume();
  tomatoState.value = ETomatoState.Timing;
};

// 从头开启计时器
const handleClickStartCountDownFromStartTime = () => {
  initTimeRef.value = duration;
  interValHandler.resume();
  tomatoState.value = ETomatoState.Timing;
};

// 暂停计时器
const handleClickPauseCountDown = () => {
  interValHandler.pause();
  tomatoState.value = ETomatoState.PAUSE;
};

// 重置计时器
const handleClickReset = () => {
  interValHandler.pause();
  tomatoState.value = ETomatoState.INIT;
  initTimeRef.value = duration;
};
</script>

<style lang="scss" module="style">
.container {
  position: relative;

  .showTime {
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 34px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }

  &:hover .maskContent {
    visibility: visible;
    opacity: 1;
  }

  .maskContent {
    transition: visibility 0.3s, opacity 0.3s linear;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
