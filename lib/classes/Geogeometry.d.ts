import { AnyLayer, AnyPaint, GeoJSONSourceRaw } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { Circle } from './GeogeometryCircle';
import { Polygon } from './GeogeometryPolygon';
import { Rectangle } from './GeogeometryRectangle';
import { Raw } from './GeogeometryRaw';
export interface GeogeometryInput {
    id: string;
    fillColor?: string;
    outlineColor?: string;
    opacity?: number;
    antialias?: boolean;
}
export declare class Geogeometry {
    id: string;
    fillColor: string;
    outlineColor?: string;
    opacity?: number;
    antialias?: boolean;
    deferred: Deferred<GeogeometryType>;
    static getGeoJSON: () => GeoJSONSourceRaw;
    static center: [number, number];
    constructor(input: GeogeometryInput);
    updateOptions(input: Partial<GeogeometryInput>): void;
    getPaint(): AnyPaint;
    getLayer(): AnyLayer;
}
export type GeogeometryType = Circle | Polygon | Rectangle | Raw;
//# sourceMappingURL=Geogeometry.d.ts.map