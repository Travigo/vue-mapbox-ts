import { Ref } from 'vue';
export interface IconOptions {
    pixelRatio: number;
    sdf: boolean;
}
export interface Icon {
    name: string;
    icon: Ref<HTMLElement> | Ref<null>;
    options: IconOptions;
}
//# sourceMappingURL=Icon.d.ts.map