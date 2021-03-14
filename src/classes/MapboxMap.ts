import { getMapboxOptions } from '@/services/MapboxMap';
import { Map, MapboxOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';

export interface MapboxMapInput extends MapboxOptions {
  mapStyle: string;
  accessToken: string;
}

// export type MapEvents = 'click' | 'contextmenu' |;