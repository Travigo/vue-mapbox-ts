import { LineLayer, LineLayout, LinePaint, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { GeogeometryPaint, GeogeometryPaintInput } from './Geogeometry.Paint';
export interface GeogeometryLineInput extends GeogeometryPaintInput {
    blur?: number;
    cap?: CanvasLineCap;
    join?: CanvasLineJoin;
    width?: number;
    color?: string;
    opacity?: number;
    translate?: [number, number];
    offset?: number;
    dasharray?: number[];
    gapWidth?: number;
    gradient?: string;
    miterLimit?: number;
    roundLimit?: number;
    sortKey?: number;
    translateAnchor?: TranslateAnchor;
}
export type TranslateAnchor = 'map' | 'viewport';
export declare class GeogeometryLine extends GeogeometryPaint {
    color: string;
    opacity: number;
    blur?: number;
    cap?: CanvasLineCap;
    join?: CanvasLineJoin;
    width?: number;
    translate?: [number, number];
    offset?: number;
    dasharray?: number[];
    gapWidth?: number;
    gradient?: string;
    miterLimit?: number;
    roundLimit?: number;
    sortKey?: number;
    translateAnchor?: TranslateAnchor;
    constructor(input: GeogeometryLineInput);
    getPaint(): LinePaint;
    getLayout(): LineLayout;
    init(): GeogeometryLine;
    update(props: Partial<GeogeometryLineInput>, vmb_map: Deferred<Map>): Promise<void>;
    getLayer(): LineLayer;
}
//# sourceMappingURL=Geogeometry.Paint.Line.d.ts.map