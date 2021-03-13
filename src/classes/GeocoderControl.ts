import { Result } from '@mapbox/mapbox-gl-geocoder';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { EmitsOptions, ObjectEmitsOptions } from 'vue';

export type FilterFunction = (r:Result) => boolean;
export type ExternalGeocoderFunction = ((searchInput: string, features: FeatureCollection<Geometry, GeoJsonProperties>) => Promise<FeatureCollection<Geometry, GeoJsonProperties>>);
export type RenderFunction = ((feature: Result) => string);
export type GetItemValueFunction = RenderFunction;
export type LocalGeocoderFunction = ((query: string) => Result[]);