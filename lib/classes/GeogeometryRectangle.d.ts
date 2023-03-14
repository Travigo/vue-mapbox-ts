import { GeoJSONSourceRaw } from 'mapbox-gl';
import { Geogeometry, GeogeometryInput } from './Geogeometry';
export interface RectangleInput extends GeogeometryInput {
    width: number;
    height: number;
    center: [number, number];
    rotationDeg?: number;
}
export declare class Rectangle extends Geogeometry {
    width: number;
    height: number;
    center: [number, number];
    rotationDeg: number;
    constructor(input: RectangleInput);
    updateOptions(input: Partial<RectangleInput>): void;
    get coordinates(): [number, number][];
    getGeoJSON(): GeoJSONSourceRaw;
}
//# sourceMappingURL=GeogeometryRectangle.d.ts.map