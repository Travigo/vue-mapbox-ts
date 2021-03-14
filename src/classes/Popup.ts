import { LngLatLike, PopupOptions } from 'mapbox-gl';

export interface MapboxPopupInput extends PopupOptions {
  lngLat: LngLatLike
}