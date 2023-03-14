import { Geogeometry, GeogeometryInput } from './Geogeometry';
import { GeoJSONSourceRaw } from 'mapbox-gl';
export type RadiusType = 'absolute' | 'relative';
export interface PolygonInput extends GeogeometryInput {
    path: Array<[number, number]>;
}
export declare class Polygon extends Geogeometry {
    path: Array<[number, number]>;
    constructor(input: PolygonInput);
    updateOptions(input: Partial<PolygonInput>): void;
    get center(): [number, number];
    getGeoJSON(): GeoJSONSourceRaw;
}
//# sourceMappingURL=GeogeometryPolygon.d.ts.map