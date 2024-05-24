// 番茄计时状态
export enum ETomatoState {
    INIT = 0, // 初始状态 未开始
    Timing = 1, // 开始计时状态
    PAUSE = 2, // 计时暂停状态
    Finish = 3,// 计时完成状态
}

// 倒计时休息状态
export enum ETomatoRestState {
    INIT = 0, // 初始状态 未开始
    Timing = 1, // 开始计时状态
    Finish = 3,// 计时完成状态
}

export enum ETomatoType {
    CountDown = 0,
    Rest = 1,
} 