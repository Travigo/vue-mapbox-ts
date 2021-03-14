import { Alignment, Anchor, LngLatLike, Marker, MarkerOptions } from 'mapbox-gl';

export interface MarkerProps extends MarkerOptions {
  lngLat?: LngLatLike
}