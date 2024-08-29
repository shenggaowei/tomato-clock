import { onMounted, onUnmounted, ref, Ref } from "vue";


export enum ENearTheScreenEdgeType {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
}

function useDrag(ele: Ref<HTMLElement | undefined>) {

    const x = ref(0);
    const y = ref(0);
    const clickTimeStampRef = ref(0);
    const edgeRef = ref<ENearTheScreenEdgeType>()

    const stopPropagationClickFunc = (e: MouseEvent) => {
        e.stopPropagation()
    }

    // 阻止事件捕获，取消内部元素的点击事件
    const stopPropagation = (isLongClick: boolean) => {
        if (isLongClick) {
            ele.value!.addEventListener('click', stopPropagationClickFunc, true)
        } else {
            ele.value!.removeEventListener('click', stopPropagationClickFunc, true)
        }
    }

    // 鼠标抬起 清除状态
    const upEvent = (e: MouseEvent) => {
        const isLongClick = new Date().getTime() - clickTimeStampRef.value > 200
        stopPropagation(isLongClick)
        // 鼠标抬起，检测是否贴边
        window.ipcRenderer.send('onMouseUp', {
            x: e.screenX - x.value,
            y: e.screenY - y.value
        })
        // 重置鼠标按下的 x y 坐标
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
            clickTimeStampRef.value = new Date().getTime();
            switch (e.button) {
                // 鼠标左键
                case 0:
                    x.value = e.x;
                    y.value = e.y;
                    document.addEventListener("mousemove", moveEvent);
                    ele.value!.addEventListener("mouseup", upEvent, true);
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

    onUnmounted(() => {
        ele.value!.removeEventListener('mouseup', upEvent)
    })

    return {
        edgeRef
    }
}

export default useDrag