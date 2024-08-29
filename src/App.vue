<script setup lang="ts">
import ProgressMask from "@/components/ProgressMask/index.vue";
import { tomatoConfig } from "@/utils/const";
import { ETomatoRestState, ETomatoState, ETomatoType } from "@/utils/type";
import { ref, watch } from "vue";
import useDrag from "./hooks/useDrag";
import CountDown from "./views/countDown/index.vue";
import RestContDown from "./views/restCountDown/index.vue";

const domRef = ref<HTMLElement>();
const countDownType = ref(ETomatoType.CountDown);
const countDownState = ref(ETomatoState.INIT);
const restCountDownState = ref(ETomatoRestState.Timing);
const countDownTime = ref(tomatoConfig[ETomatoType.CountDown].duration);
const restCountDownTime = ref(tomatoConfig[ETomatoType.Rest].duration);
const percentage = ref<number>();

const { edgeRef } = useDrag(domRef);

// 休息完成后的回调
const onRestCountDownFinishCallback = () => {
  countDownType.value = ETomatoType.CountDown;
  countDownState.value = ETomatoState.INIT;
  restCountDownState.value = ETomatoRestState.INIT;
};

// 工作计时完成后的回调
const onClickStartRestCallback = () => {
  countDownType.value = ETomatoType.Rest;
  countDownState.value = ETomatoState.Finish;
  restCountDownState.value = ETomatoRestState.Timing;
};

watch(
  () => [countDownType.value, countDownTime.value, restCountDownTime.value],
  ([_type, _countDownTime, _restCountDownTime]) => {
    if (_type === ETomatoType.CountDown) {
      const duration = tomatoConfig[ETomatoType.CountDown].duration;
      percentage.value = Math.floor(((duration - _countDownTime) / duration) * 100);
    } else if (_type === ETomatoType.Rest) {
      const duration = tomatoConfig[ETomatoType.Rest].duration;
      percentage.value = Math.floor(((duration - _restCountDownTime) / duration) * 100);
    }
  }
);
</script>

<template>
  <div ref="domRef" :class="style.container">
    <div v-show="!edgeRef">
      <CountDown
        v-model:state="countDownState"
        v-model:time="countDownTime"
        @on-click-start-rest="onClickStartRestCallback"
        v-show="countDownType === ETomatoType.CountDown"
      />
      <RestContDown
        v-model:time="restCountDownTime"
        v-model:state="restCountDownState"
        @onRestCountDownFinishCallback="onRestCountDownFinishCallback"
        v-show="countDownType === ETomatoType.Rest"
      />
    </div>
    <ProgressMask :percentage="percentage" v-show="edgeRef" :direction="edgeRef" :class="style.progressMask" />
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
