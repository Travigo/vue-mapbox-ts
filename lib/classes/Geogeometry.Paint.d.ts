import { AnyLayer, AnyPaint } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { GeogeometryFill } from './Geogeometry.Paint.Fill';
import { GeogeometryLine } from './Geogeometry.Paint.Line';
import { GeogeometryType } from './Geogeometry';
export type GeogeometryPaintType = GeogeometryFill | GeogeometryLine;
export interface GeogeometryPaintInput {
    geogeometry: Deferred<GeogeometryType>;
    geoId?: string;
}
export declare class GeogeometryPaint {
    geoId?: string;
    id?: string;
    geogeometry: Deferred<GeogeometryType>;
    deferred: Deferred<GeogeometryPaintType>;
    static getPaint: () => AnyPaint;
    static update: (...args: any) => void | Promise<void>;
    static getLayer: () => AnyLayer;
    constructor(input: GeogeometryPaintInput);
    _init(paintType: string, id: string | number): Promise<void>;
    setGeoId(id: string): void;
}
//# sourceMappingURL=Geogeometry.Paint.d.ts.map