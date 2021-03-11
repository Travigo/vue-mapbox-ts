import { MapboxOptions } from 'mapbox-gl';

export interface MapboxMapInput extends MapboxOptions {
  mapStyle: string;
}