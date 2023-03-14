import { Geogeometry, GeogeometryInput } from './Geogeometry';
import { GeoJSONSourceRaw } from 'mapbox-gl';
export type RadiusType = 'absolute' | 'relative';
export interface CircleInput extends GeogeometryInput {
    radius: number;
    center: [number, number];
    edges?: number;
}
export declare class Circle extends Geogeometry {
    radius: number;
    center: [number, number];
    edges: number;
    constructor(input: CircleInput);
    updateOptions(input: Partial<CircleInput>): void;
    getGeoJSON(): GeoJSONSourceRaw;
}
//# sourceMappingURL=GeogeometryCircle.d.ts.map