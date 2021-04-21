import { UnwrapRef } from '@vue/reactivity';
import { Map, MapboxOptions } from 'mapbox-gl';

export interface DivStyle {
  height: string;
  width: string;
  '--zoom-logo': number;
}

export interface MapboxMapInput extends MapboxOptions {
  mapStyle: string;
  accessToken: string;
  height: string;
  width: string;
  flyToOptions: UnwrapRef<FlyToOptions>;
  autoResize: boolean;
}

export interface FlyToOptions {
  curve?: number;
  minZoom?: number;
  speed?: number;
  screenSpeed?: number;
  maxDuration?: number;
}

