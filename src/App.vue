<script setup lang="ts">
import ProgressMask from "@/components/ProgressMask/index.vue";
import { ETomatoRestState, ETomatoType } from "@/utils/type";
import { ref } from "vue";
import useDrag from "./hooks/useDrag";
import CountDown from "./views/countDown/index.vue";
import RestContDown from "./views/restCountDown/index.vue";

const domRef = ref<HTMLElement>();
const countDownType = ref(ETomatoType.CountDown);
const restCountDownState = ref(ETomatoRestState.Timing);

const { edgeRef } = useDrag(domRef);

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
</script>

<template>
  <div ref="domRef" :class="style.container">
    <CountDown @on-click-start-rest="onClickStartRestCallback" v-if="countDownType === ETomatoType.CountDown" />
    <RestContDown :state="restCountDownState" @onRestCountDownFinishCallback="onRestCountDownFinishCallback" v-else />
    <ProgressMask v-show="false" :direction="edgeRef" :class="style.progressMask" />
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
  border-radius: 4px;
  box-shadow: 0px 1px 3px #ccc;

  .progressMask {
    background: rgba(255, 255, 255, 0.95);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>
