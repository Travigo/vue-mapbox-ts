export type Primitive = number | string | boolean | bigint | symbol | null | undefined;
import { ComponentInternalInstance } from 'vue';
import { InstanceWithOn } from '../classes/VueMapbox';
export declare const slotIsNotEmpty: (el: HTMLElement) => boolean;
export declare const filterObject: <T extends Record<string, any>>(object: T, keys?: (keyof T)[] | undefined, blacklist?: Array<any>) => T;
export declare const parentsNameIs: (instance: any, parentName: string) => boolean;
export declare const parentNameContains: (instance: any, parentNameFragment: string) => boolean;
export declare const duplicateEvents: <T extends InstanceWithOn<any>>(object: T, instance: ComponentInternalInstance, events: Array<string>) => void;
//# sourceMappingURL=VueHelpers.d.ts.map