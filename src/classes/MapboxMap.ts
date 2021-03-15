import { getMapboxOptions } from '@/services/MapboxMap';
import { Map, MapboxOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';

export interface MapboxMapInput extends MapboxOptions {
  mapStyle: string;
  accessToken: string;
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