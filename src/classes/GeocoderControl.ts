import { Result, Results } from '@mapbox/mapbox-gl-geocoder';
import { ComponentInternalInstance } from 'vue';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export type FilterFunction = (r:Result) => boolean;
export type ExternalGeocoderFunction = ((searchInput: string, features: FeatureCollection<Geometry, GeoJsonProperties>) => Promise<FeatureCollection<Geometry, GeoJsonProperties>>);
export type RenderFunction = ((feature: Result) => string);
export type GetItemValueFunction = RenderFunction;
export type LocalGeocoderFunction = ((query: string) => Result[]);

export interface GeocoderComponentInstanceAdditions {
  proxy: {
    showOriginalGeocoder: boolean;
    geocoderState: {
      result: Result,
      results: Results,
      error: null | string;
      loading: null | string;
    }
  }
}

export type GeocoderComponentInstance = GeocoderComponentInstanceAdditions & ComponentInternalInstance;