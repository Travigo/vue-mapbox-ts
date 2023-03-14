export type RenderFuncInput<DataType> = (timestamp: DOMHighResTimeStamp, data: DataType) => void;
export type RenderFunc = (t: DOMHighResTimeStamp) => void;
export interface AnimationOptions {
    speed: number;
}
export declare class Animation<DataType> {
    renderFunc: RenderFuncInput<DataType>;
    animation?: number;
    running: boolean;
    startTime: number;
    progress: number;
    data: DataType;
    pauseTime: number;
    speed: number;
    constructor(data: DataType, renderFunc: RenderFuncInput<DataType>, opts?: AnimationOptions);
    start(): void;
    pause(): void;
    reset(): void;
    stop(): void;
    internalRenderFunc(timestamp: DOMHighResTimeStamp): void;
}
//# sourceMappingURL=Animation.d.ts.map