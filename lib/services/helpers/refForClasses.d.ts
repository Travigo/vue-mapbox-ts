import { Ref } from 'vue';
export declare const isPrimitive: (input: any) => boolean;
export declare const refGetter: <T>(cl: Record<string, any>, varName: string) => Ref<T>;
export declare const refSetter: <T>(value: T, cl: Record<string, any>, privateVar: string) => void;
//# sourceMappingURL=refForClasses.d.ts.map