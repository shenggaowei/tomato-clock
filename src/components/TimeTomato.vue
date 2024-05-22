<template>
  <div ref="domRef" :class="style.container">测试</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const x = ref(0);
const y = ref(0);

const domRef = ref<HTMLElement>();

const upEvent = () => {
  x.value = 0;
  y.value = 0;
  document.removeEventListener("mousemove", moveEvent);
};

const moveEvent = (e: MouseEvent) => {
  window.ipcRenderer.send("suspensionWindowMove", {
    x: e.screenX - x.value,
    y: e.screenY - y.value,
  });
};

const initSuspension = () => {
  domRef.value?.addEventListener("mousedown", (e) => {
    switch (e.button) {
      // 鼠标左键
      case 0:
        x.value = e.x;
        y.value = e.y;
        document.addEventListener("mousemove", moveEvent);
        domRef.value?.addEventListener("mouseup", upEvent);
        break;
      case 2:
        break;
    }
  });
  domRef.value?.addEventListener("mouseup", upEvent);
};

onMounted(() => {
  initSuspension();
});
</script>

<style lang="scss" module="style">
.container {
  width: 70px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.95);
  overflow: hidden;
  cursor: pointer;
  color: red;
  user-select: none;
}
</style>
