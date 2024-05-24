import { ETomatoType } from "./type";

export const tomatoConfig = {
    [ETomatoType.CountDown]: {
        duration: 1 * 10,
        style: {
            color: "#000"
        }
    },
    [ETomatoType.Rest]: {
        duration: 1 * 10,
        style: {
            color: "rgba(44,44,44,.7)"
        }
    }
} 