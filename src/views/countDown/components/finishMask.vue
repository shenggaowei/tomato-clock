<template>
  <div :class="style.container">
    <SvgIcon @click="handleClickStartRest" color="#3CB371" :class="style.icon" iconName="icon-play" />
    <SvgIcon
      @click="handleClickFromStartTime"
      color="rgba(44,44,44,.7)"
      :class="[style.icon, style.icon_stop]"
      iconName="icon-stop"
    />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/Icon/index.vue";

interface IEmits {
  (e: "on-click-start-rest"): void;
  (e: "on-click-start-from-start-time"): void;
}

const emits = defineEmits<IEmits>();

const handleClickFromStartTime = () => {
  emits("on-click-start-from-start-time");
};

const handleClickStartRest = () => {
  emits("on-click-start-rest");
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
