import { FlyToOptions, LngLatLike } from 'mapbox-gl';
import { Ref, UnwrapRef } from 'vue';

export type ORef<T> = Ref< T | undefined > | undefined;

export interface regularProps {
  bearing: ORef<number>;
  maxBounds: ORef<any>;
  maxPitch: ORef<number>;
  minPitch: ORef<number>;
  pitch: ORef<number>;
  renderWorldCopies: ORef<boolean>;
}

export interface reactiveProps {
  center: UnwrapRef<LngLatLike>;
  flyToOptions: UnwrapRef<FlyToOptions>;
}

export interface positionProps {
  zoom?: ORef<number>,
  minZoom?: ORef<number>,
  maxZoom?: ORef<number>,
  center?: UnwrapRef<LngLatLike>,
  flyToOptions?: UnwrapRef<FlyToOptions>,
  touchZoomRotate?: any
}

export interface positionPropsUnwrapped {
  zoom?: number,
  minZoom?: number,
  maxZoom?: number,
  center?: UnwrapRef<LngLatLike>,
  flyToOptions?: UnwrapRef<FlyToOptions>
}