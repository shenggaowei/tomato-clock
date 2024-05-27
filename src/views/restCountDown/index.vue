<template>
  <div :class="style.container">
    <div :class="style.showTime">
      {{ showTimeRef }}
    </div>
    <Stop
      v-show="tomatoRestState === ETomatoRestState.Timing"
      @on-click-stop="handleClickStop"
      :class="style.maskContent"
    />
  </div>
</template>

<script setup lang="ts">
import { tomatoConfig } from "@/utils/const";
import { ETomatoRestState, ETomatoType } from "@/utils/type";
import { useIntervalFn } from "@vueuse/core";
import { computed, ref, toRef, watch } from "vue";
import Stop from "./components/stop.vue";

interface IProps {
  state?: ETomatoRestState;
}

interface IEmits {
  (e: "onRestCountDownFinishCallback"): void;
}

const props = withDefaults(defineProps<IProps>(), {
  state: ETomatoRestState.Timing,
});
const emits = defineEmits<IEmits>();

const { duration } = tomatoConfig[ETomatoType.Rest];
const initTimeRef = ref(duration);
const tomatoRestState = toRef(props, "state");

// 倒计时结束回调
const countDownFinishCallback = () => {
  if (initTimeRef.value === 0) {
    tomatoRestState.value = ETomatoRestState.Finish;
    interValHandler.pause();
    initTimeRef.value = duration;
    emits("onRestCountDownFinishCallback");
    return;
  }
  initTimeRef.value--;
};

// 轮训倒计时
const interValHandler = useIntervalFn(countDownFinishCallback, 1000, { immediate: false });

// 监听状态变化，如果是倒计时状态，则开启定时器
watch(
  () => tomatoRestState.value,
  (val) => {
    if (val === ETomatoRestState.Timing) {
      interValHandler.resume();
    }
  },
  { immediate: true }
);

// 显示时间
const showTimeRef = computed(() => {
  const minute = Math.floor(initTimeRef.value / 60);
  const second = initTimeRef.value % 60;
  return `${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
});

// 停止倒计时
const handleClickStop = () => {
  interValHandler.pause();
  tomatoRestState.value = ETomatoRestState.Finish;
  initTimeRef.value = duration;
  emits("onRestCountDownFinishCallback");
};
</script>

<style lang="scss" module="style">
.container {
  width: 74px;
  height: 34px;
  background: rgba(255, 255, 255, 0.95);
  user-select: none;
  overflow: hidden;
  position: relative;
  border-radius: 8px;

  .showTime {
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 34px;
    font-size: 16px;
    color: green;
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
