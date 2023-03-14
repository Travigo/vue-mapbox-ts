import { GeogeometryInput, GeogeometryType } from '../classes/Geogeometry';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
export declare const parentIsGeogeometry: (instance: any) => boolean;
export declare const distanceToLat: (km: number) => number;
export declare const distanceToLong: (km: number, lat: number) => number;
export declare const mountGeogeometry: (vmb_map: Deferred<Map>, vmb_geogeometry: GeogeometryType) => Promise<void>;
export declare const updateGeogeometry: (props: Partial<GeogeometryInput>, vmb_map: Deferred<Map>, vmb_geogeometry: GeogeometryType) => Promise<void>;
//# sourceMappingURL=MapboxGeogeometry.d.ts.map