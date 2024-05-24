<script setup lang="ts">
import { ETomatoRestState, ETomatoType } from "@/utils/type";
import { ref } from "vue";
import useDrag from "./hooks/useDrag";
import CountDown from "./views/countDown/index.vue";
import RestContDown from "./views/restCountDown/index.vue";

const domRef = ref<HTMLElement>();
const countDownType = ref(ETomatoType.CountDown);
const restCountDownState = ref(ETomatoRestState.Timing);

// 休息完成后的回调
const onRestCountDownFinishCallback = () => {
  countDownType.value = ETomatoType.CountDown;
  restCountDownState.value = ETomatoRestState.INIT;
};

// 工作计时完成后的回调
const onClickStartRestCallback = () => {
  countDownType.value = ETomatoType.Rest;
  restCountDownState.value = ETomatoRestState.Timing;
};

useDrag(domRef);
</script>

<template>
  <div ref="domRef" :class="style.container">
    <CountDown @on-click-start-rest="onClickStartRestCallback" v-if="countDownType === ETomatoType.CountDown" />
    <RestContDown :state="restCountDownState" @onRestCountDownFinishCallback="onRestCountDownFinishCallback" v-else />
  </div>
</template>

<style lang="scss" module="style">
.container {
  width: 74px;
  height: 34px;
  background: rgba(255, 255, 255, 0.95);
  user-select: none;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
}
</style>
