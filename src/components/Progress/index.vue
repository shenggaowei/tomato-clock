<template>
  <div :class="[style.container, containerClass]">
    <div :class="contentClass">
      <div :class="innerClass" :style="innerStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from "vue";
import { EDirections } from "./interface";

interface IProps {
  directions?: EDirections;
  percentage?: number;
}

const $style = useCssModule("style");
const props = withDefaults(defineProps<IProps>(), {
  directions: EDirections.VERTICAL,
  percentage: 71,
});

const innerClass = computed(() => {
  if (props.directions === EDirections.HORIZONTAL) {
    return $style.horizontal_inner;
  } else {
    return $style.vertical_inner;
  }
});

const contentClass = computed(() => {
  if (props.directions === EDirections.HORIZONTAL) {
    return $style.horizontal_content;
  } else {
    return $style.vertical_content;
  }
});

const containerClass = computed(() => {
  if (props.directions === EDirections.VERTICAL) {
    return $style.vertical;
  } else {
    return $style.horizontal;
  }
});

const innerStyle = computed(() => {
  if (props.directions === EDirections.HORIZONTAL) {
    return { width: `${props.percentage}%` };
  } else {
    return { height: `${props.percentage}%` };
  }
});
</script>

<style lang="scss" module="style">
.container {
  &.horizontal {
    height: 4px;
  }

  &.vertical {
    width: 4px;
    height: 100%;
  }

  .horizontal_content {
    height: 100%;
    margin: 0 4px;
    border-radius: 2px;
    position: relative;
    background-color: rgb(204, 204, 204, 0.7);

    .horizontal_inner {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: rgb(153, 150, 150, 0.7);
    }
  }

  .vertical_content {
    height: calc(100% - 8px);
    margin: 4px 0;
    position: relative;
    background-color: rgb(204, 204, 204, 0.7);

    .vertical_inner {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      border-radius: 2px;
      background-color: rgb(153, 150, 150, 0.7);
    }
  }
}
</style>
