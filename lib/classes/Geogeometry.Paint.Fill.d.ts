import { FillLayer, FillPaint, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { GeogeometryPaint, GeogeometryPaintInput } from './Geogeometry.Paint';
export interface GeogeometryFillInput extends GeogeometryPaintInput {
    color?: string;
    antialias?: boolean;
    opacity?: number;
    outlineColor?: string;
}
export declare class GeogeometryFill extends GeogeometryPaint {
    color: string;
    antialias: boolean;
    opacity: number;
    outlineColor?: string;
    constructor(input: GeogeometryFillInput);
    init(): Promise<void>;
    getPaint(): FillPaint;
    update(props: Partial<GeogeometryFillInput>, vmb_map: Deferred<Map>): Promise<void>;
    getLayer(): FillLayer;
}
//# sourceMappingURL=Geogeometry.Paint.Fill.d.ts.map