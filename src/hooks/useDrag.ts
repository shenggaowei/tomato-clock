import { onMounted, ref, Ref } from "vue";


export enum ENearTheScreenEdgeType {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
}

function useDrag(ele: Ref<HTMLElement | undefined>) {

    const x = ref(0);
    const y = ref(0);
    const edgeRef = ref<ENearTheScreenEdgeType>()

    // 鼠标抬起 清除状态
    const upEvent = (e: MouseEvent) => {
        // 鼠标抬起，检测是否贴边
        window.ipcRenderer.send('onMouseUp', {
            x: e.screenX - x.value,
            y: e.screenY - y.value
        })
        // 重置鼠标按下的 x y 坐标
        x.value = 0;
        y.value = 0;
        document.removeEventListener("mousemove", moveEvent);
        edgeRef.value = undefined
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
        window.ipcRenderer.on('testWindowOnScreenEdge', (channel, args: any) => {
            edgeRef.value = args.edge
        })
    });

    return {
        edgeRef
    }
}

export default useDrag