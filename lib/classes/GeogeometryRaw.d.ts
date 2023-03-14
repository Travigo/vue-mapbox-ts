import { Geogeometry, GeogeometryInput } from './Geogeometry';
import { GeoJSONSourceRaw } from 'mapbox-gl';
import { Feature, FeatureCollection } from 'geojson';
export type RadiusType = 'absolute' | 'relative';
export interface RawInput extends GeogeometryInput {
    source: GeoJSONSourceRaw | Feature | FeatureCollection;
}
export declare class Raw extends Geogeometry {
    source: GeoJSONSourceRaw | Feature | FeatureCollection;
    constructor(input: RawInput);
    updateOptions(input: Partial<RawInput>): void;
    get center(): [number, number];
    getGeoJSON(): GeoJSONSourceRaw;
    getGeoJSONData(): Feature | FeatureCollection;
}
//# sourceMappingURL=GeogeometryRaw.d.ts.map