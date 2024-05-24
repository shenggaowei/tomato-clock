<template>
  <div :class="style.container">
    <SvgIcon @click="handleClickPause" :class="style.icon" iconName="icon-pause2" />
    <SvgIcon @click="handleClickReset" :class="[style.icon, style.icon_stop]" iconName="icon-stop" />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/Icon/index.vue";

interface IEmits {
  (e: "onClickPause"): void;
  (e: "onClickReset"): void;
}

const emits = defineEmits<IEmits>();

const handleClickPause = () => {
  emits("onClickPause");
};

const handleClickReset = () => {
  emits("onClickReset");
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
  background-color: rgba(255, 255, 255, 0.95);

  .icon {
    cursor: pointer;
    font-size: 18px;

    &_stop {
      margin-left: 4px;
    }
  }
}
</style>
