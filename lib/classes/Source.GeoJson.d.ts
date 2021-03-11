export declare const getEmptyFeatureCollection: () => {
    type: string;
    features: never[];
};
export default class GeoJsonSource {
    type: 'FeatureCollection';
    features: Array<any>;
    constructor();
}
export interface PointFeatureInput {
    coordinates: [number, number];
    properties?: Record<string, any>;
}
export declare class PointFeature {
    type: 'Feature';
    properties: Record<string, any>;
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
    constructor(input: PointFeatureInput);
}
//# sourceMappingURL=Source.GeoJson.d.ts.map