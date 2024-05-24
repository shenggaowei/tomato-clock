<template>
  <div :class="style.container">
    <SvgIcon @click="handleClickPause" :class="style.icon" iconName="icon-Tomato-2" />
    <span :class="style.tomatoCount">+1</span>
    <FinishMask
      @on-click-start-from-start-time="emits('on-click-start-from-start-time')"
      @on-click-start-rest="emits('on-click-start-rest')"
      :class="style.finishMask"
    />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/Icon/index.vue";
import FinishMask from "./finishMask.vue";

interface IEmits {
  (e: "onClickPause"): void;
  (e: "on-click-start-rest"): void;
  (e: "on-click-start-from-start-time"): void;
}

const emits = defineEmits<IEmits>();

const handleClickPause = () => {
  emits("onClickPause");
};
</script>

<style lang="scss" module="style">
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);

  .icon {
    cursor: pointer;
    font-size: 18px;
  }

  .tomatoCount {
    margin-left: 2px;
    font-size: 14px;
    color: rgb(214, 100, 100);
    font-weight: bold;
  }

  .finishMask {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0.3s, opacity 0.3s linear;
  }

  &:hover .finishMask {
    opacity: 1;
    visibility: visible;
  }
}
</style>
