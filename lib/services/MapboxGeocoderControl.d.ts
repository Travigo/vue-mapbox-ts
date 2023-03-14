import Deferred from 'my-deferred';
import { Map } from 'mapbox-gl';
import MapboxGeocoder, { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import { GeocoderComponentInstance } from '../classes/GeocoderControl';
export declare const mountGeocoderControl: (vmb_map: Deferred<Map> | null, vmb_geocoder: Deferred<MapboxGeocoder>, props: GeocoderOptions, instance: GeocoderComponentInstance) => Promise<void>;
export declare const mountGeocoderEvents: (vmb_geocoder: Deferred<MapboxGeocoder>, instance: GeocoderComponentInstance) => Promise<void>;
export declare const getGeocoderControlOptions: (props: GeocoderOptions) => GeocoderOptions;
export declare const attachToInput: (ref: HTMLElement, geocoder: MapboxGeocoder, instance: GeocoderComponentInstance) => void;
//# sourceMappingURL=MapboxGeocoderControl.d.ts.map