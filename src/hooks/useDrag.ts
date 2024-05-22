import { onMounted, ref, Ref } from "vue";
function useDrag(ele: Ref<HTMLElement | undefined>) {

    const x = ref(0);
    const y = ref(0);


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
        ele.value!.addEventListener("mousedown", (e) => {
            switch (e.button) {
                // 鼠标左键
                case 0:
                    x.value = e.x;
                    y.value = e.y;
                    document.addEventListener("mousemove", moveEvent);
                    ele.value!.addEventListener("mouseup", upEvent);
                    break;
                case 2:
                    break;
            }
        });
        ele.value!.addEventListener("mouseup", upEvent);
    };

    onMounted(() => {
        initSuspension();
    });
}

export default useDrag