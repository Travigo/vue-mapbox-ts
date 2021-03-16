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
  flyToOptions: FlyToOptions
}

export interface FlyToOptions {
  curve?: number;
  minZoom?: number;
  speed?: number;
  screenSpeed?: number;
  maxDuration?: number;
}

// export type MapEvents = 'click' | 'contextmenu' |;