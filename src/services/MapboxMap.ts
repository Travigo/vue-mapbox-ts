import mapboxgl, { MapboxOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { ref, Ref } from 'vue';

import { MapboxMapInput } from '../classes/MapboxMap';

export const getStyle = (props:any) => ref({
  height: props.height,
  width: props.width,
  '--zoom-logo': props.zoomLogo >= 0.8 ? props.zoomLogo : 1,
});

export const getMapStyle = (raw:string):string =>
  raw.includes('/') ? raw : `mapbox://styles/mapbox/${raw}`;

export const getMapboxOptions = (props: MapboxMapInput, el: any): MapboxOptions => {
  const {
    accessToken,
    container,
    minZoom,
    maxZoom,
    minPitch,
    maxPitch,    
    hash,
    interactive,
    bearingSnap,
    pitchWithRotate,
    clickTolerance,
    attributionControl,
    customAttribution,
    logoPosition,
    failIfMajorPerformanceCaveat,
    preserveDrawingBuffer,
    antialias,
    refreshExpiredTiles,
    maxBounds,
    scrollZoom,
    boxZoom,
    dragRotate,
    dragPan,
    keyboard,
    doubleClickZoom,
    touchZoomRotate,
    trackResize,
    center,
    zoom,
    bearing,
    pitch,
    bounds,
    fitBoundsOptions,
    renderWorldCopies,
    maxTileCacheSize,
    localIdeographFontFamily,
    transformRequest,
    collectResourceTiming,
    fadeDuration,
    crossSourceCollisions,
  } = props;

  const style = getMapStyle(props.mapStyle);

  return {
    accessToken,
    container: container || el,
    minZoom,
    maxZoom,
    minPitch,
    maxPitch,
    style,
    hash,
    interactive,
    bearingSnap,
    pitchWithRotate,
    clickTolerance,
    attributionControl,
    customAttribution,
    logoPosition,
    failIfMajorPerformanceCaveat,
    preserveDrawingBuffer,
    antialias,
    refreshExpiredTiles,
    maxBounds,
    scrollZoom,
    boxZoom,
    dragRotate,
    dragPan,
    keyboard,
    doubleClickZoom,
    touchZoomRotate,
    trackResize,
    center,
    zoom,
    bearing,
    pitch,
    bounds,
    fitBoundsOptions,
    renderWorldCopies,
    maxTileCacheSize,
    localIdeographFontFamily,
    transformRequest,
    collectResourceTiming,
    fadeDuration,
    crossSourceCollisions,
  };
};

export const mountMap = (props:MapboxMapInput, vmb_map:Deferred<Map>, rootRef: Ref<any>) =>
  (() => {
    const element = rootRef.value;
    const mapOptions = getMapboxOptions(props, element);
    const map = new mapboxgl.Map(mapOptions);

    map.on('load', () => {
      vmb_map.resolve(map);
    });

  })();