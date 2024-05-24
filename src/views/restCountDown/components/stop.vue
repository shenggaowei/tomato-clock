<template>
  <div :class="style.container">
    <SvgIcon @click="handleClickStop" :class="style.icon" iconName="icon-stop" />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/Icon/index.vue";

interface IEmits {
  (e: "onClickStop"): void;
}

const emits = defineEmits<IEmits>();

const handleClickStop = () => {
  emits("onClickStop");
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
  }
}
</style>
