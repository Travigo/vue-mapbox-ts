/**
 * Automatically set a mapbox element's props when the vue element props changes
 *
 * @param  {Vue}    vueElement    The Vue component in question
 * @param  {Mixed}  mapboxElement The Mapbox element bound to the component
 * @param  {Object} props         The component's props definition object
 * @return {void}
 */
export declare const propNeedsBinding: (prop: any) => boolean;
export declare const getSetMethodName: (propName: string) => string;
export default function bindProps(vueElement: any, mapboxElement: any, props: any): void;
//# sourceMappingURL=bind-props.d.ts.map