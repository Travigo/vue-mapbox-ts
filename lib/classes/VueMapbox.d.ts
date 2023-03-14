type CallbackFunction<CallbackType> = (cb: CallbackType) => any;
export interface InstanceWithOn<CallbackType> {
    on: (evt: string, cb: CallbackFunction<CallbackType>) => void;
}
export {};
//# sourceMappingURL=VueMapbox.d.ts.map