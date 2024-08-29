<template>
  <div :class="style.container" @mouseenter="onMouseEnter">
    <ProgressBar :percentage="percentage" :directions="progressDirection" :class="[style.content, progressClass]" />
  </div>
</template>

<script setup lang="ts">
import { EDirections } from "@/components/Progress/interface";
import { ENearTheScreenEdgeType } from "@/hooks/useDrag";
import { computed, useCssModule } from "vue";
import ProgressBar from "../Progress/index.vue";

interface IProps {
  direction?: ENearTheScreenEdgeType;
  percentage?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  direction: ENearTheScreenEdgeType.BOTTOM,
  percentage: 0,
});
const $style = useCssModule("style");

const onMouseEnter = (e: MouseEvent) => {
  console.log("onMouseEnter");
};

const progressDirection = computed(() => {
  switch (props.direction) {
    case ENearTheScreenEdgeType.TOP:
      return EDirections.HORIZONTAL;
    case ENearTheScreenEdgeType.BOTTOM:
      return EDirections.HORIZONTAL;
    case ENearTheScreenEdgeType.LEFT:
      return EDirections.VERTICAL;
    case ENearTheScreenEdgeType.RIGHT:
      return EDirections.VERTICAL;
  }
});

const progressClass = computed(() => {
  switch (props.direction) {
    case ENearTheScreenEdgeType.TOP:
      return $style.top;
    case ENearTheScreenEdgeType.BOTTOM:
      return $style.bottom;
    case ENearTheScreenEdgeType.LEFT:
      return $style.left;
    case ENearTheScreenEdgeType.RIGHT:
      return $style.right;
  }
});
</script>

<style lang="scss" module="style">
.container {
  position: relative;

  .content {
    position: absolute;
    &.top {
      width: 100%;
      height: 4px;
      bottom: 4px;
    }

    &.bottom {
      width: 100%;
      height: 4px;
      top: 4px;
    }

    &.left {
      right: 4px;
      width: 4px;
      height: 100%;
    }

    &.right {
      left: 4px;
      width: 4px;
      height: 100%;
    }
  }
}
</style>
