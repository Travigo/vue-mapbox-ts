import { positionProps, positionPropsUnwrapped, reactiveProps, regularProps } from '../classes/map';
import mapboxgl, { MapboxOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref, toRef, toRefs, watch } from 'vue';
import { ComponentInternalInstance } from 'vue';

import { DivStyle, MapboxMapInput } from '../classes/MapboxMap';
import { duplicateEvents, filterObject } from './VueHelpers';
import conditionalWatch from './helpers/conditionalWatch';
import { enableAutoResize, enableTouchZoomRotate } from './MapboxMap/index';

export const getStyle = (props:any):DivStyle =>({
  height: props.height,
  width: props.width,
  '--zoom-logo': props.zoomLogo >= 0.8 ? props.zoomLogo : 1,
});

export const getMapStyle = (raw:string):string =>
  raw.includes('/') ? raw : `mapbox://styles/mapbox/${raw}`;

export const getMapboxOptions = (props: MapboxMapInput, el: any): MapboxOptions => {
  const opts = filterObject(props, [
    'accessToken',
    'antialias',
    'attributionControl',
    'bearing',
    'bearingSnap',
    'bounds',
    'boxZoom',
    'center',
    'clickTolerance',
    'collectResourceTiming',
    'container',
    'cooperativeGestures',
    'crossSourceCollisions',
    'customAttribution',
    'doubleClickZoom',
    'dragPan',
    'dragRotate',
    'fadeDuration',
    'failIfMajorPerformanceCaveat',
    'fitBoundsOptions',
    'hash',
    'interactive',
    'keyboard',
    'localIdeographFontFamily',
    'logoPosition',
    'maxBounds',
    'maxPitch',    
    'maxTileCacheSize',
    'maxZoom',
    'minPitch',
    'minZoom',
    'pitch',
    'pitchWithRotate',
    'preserveDrawingBuffer',
    'projection',
    'refreshExpiredTiles',
    'renderWorldCopies',
    'scrollZoom',
    'touchZoomRotate',
    'trackResize',
    'transformRequest',
    'zoom',
  ]);

  opts.style = getMapStyle(props.mapStyle);
  opts.container = el;

  return opts;

};

export const mountMap = (props:MapboxMapInput, vmb_map:Deferred<Map>, mapContainerRef: Ref<any>, rootContainerRef: Ref<any>) =>
  (() => {
    const element = mapContainerRef.value;
    const mapOptions = getMapboxOptions(props, element);
    const map = new mapboxgl.Map(mapOptions);

    map.on('load', () => {
      vmb_map.resolve(map);
    });

    if(props.autoResize){
      enableAutoResize(rootContainerRef, map, props.autoResizeDelay);
    }

    if(props.touchZoomRotate){
      enableTouchZoomRotate(map, toRef(props, 'touchZoomRotate'));
    }
  })();

export const coordsChanged = (newCoords:[number, number], oldCorrds: [number, number]) => 
  newCoords[0] !== oldCorrds[0] || newCoords[1] !== newCoords[1];


export const updateStyle = (props:any, style:Ref<DivStyle>):void => {
  style.value = getStyle(props);
};

export async function mapWatcher(
  vmb_map:Deferred<Map>, 
  props:Record<string,any>, 
  propsReactive: reactiveProps
){
  const {
    cooperativeGestures,
    width,
    height,
    bearing,
    maxBounds,
    maxPitch,
    minZoom,
    maxZoom,
    minPitch,
    pitch,
    projection,
    renderWorldCopies,
    zoom,
    mapStyle
  } = toRefs(props);

  const { center, flyToOptions } = propsReactive;
  

  await watchDimensions(vmb_map, width, height);
  await watchRegular(vmb_map, { bearing, maxBounds, maxPitch, minPitch, pitch, renderWorldCopies });
  await watchPosition(vmb_map, { maxZoom, center, flyToOptions, minZoom, zoom });
  await watchMapStyle(vmb_map, mapStyle);
  await watchProjection(vmb_map, projection);

}

export async function watchMapStyle (vmb_map:Deferred<Map>, mapStyle:Ref<string>){
  const map = await vmb_map.promise;
  watch(mapStyle, (newStyle:string) => map.setStyle(newStyle));  
}

export async function watchDimensions(vmb_map:Deferred<Map>, width:Ref<string>, height:Ref<string>){
  const map = await vmb_map.promise;
  watch(width, () => map.resize());
  watch(height, () => map.resize());
}

export async function watchRegular(vmb_map:Deferred<Map>, refs:regularProps){
  const map = await vmb_map.promise;
  conditionalWatch(refs.bearing, val => map.setBearing(val));
  conditionalWatch(refs.maxBounds, val => map.setMaxBounds(val));
  conditionalWatch(refs.maxPitch, val => map.setMaxPitch(val));
  conditionalWatch(refs.minPitch, val => map.setMinPitch(val));
  conditionalWatch(refs.pitch, val => map.setPitch(val));
  conditionalWatch(refs.renderWorldCopies, val => map.setRenderWorldCopies(val));
}

export function watchPosition(vmb_map:Deferred<Map>, refs:positionProps){

  conditionalWatch(refs.center as any as [number, number], center => updateMapPosition(vmb_map, { center }), { deep: true });
  conditionalWatch(refs.flyToOptions, flyToOptions => updateMapPosition(vmb_map, { flyToOptions }), { deep: true });
  conditionalWatch(refs.maxZoom, maxZoom => updateMapPosition(vmb_map, { maxZoom }));
  conditionalWatch(refs.minZoom, minZoom => updateMapPosition(vmb_map, { minZoom }));
  conditionalWatch(refs.zoom, zoom => updateMapPosition(vmb_map, { zoom }));
}

// Update with type definition after mapbox updates @types/mapbox-gl
export async function watchProjection(vmb_map:Deferred<Map>, projectionRef: Ref<any>){
  const map = await vmb_map.promise;

  conditionalWatch(projectionRef, proj => map.setProjection(proj));
  
}

export async function updateMapPosition(vmb_map:Deferred<Map>, posProps: positionPropsUnwrapped){
  const map = await vmb_map.promise;
  const opts = posProps.flyToOptions 
    ? filterObject(posProps.flyToOptions, ['curve', 'maxDuration', 'minZoom', 'screenSpeed', 'speed'])
    : {};
  
  if(posProps.center)
    opts.center = posProps.center;
  if(posProps.zoom)
    opts.zoom = posProps.zoom;

  map.flyTo(opts);
}

export const MapGlEvents = [
  'boxzoomstart',
  'click',
  'contextmenu',
  'data',
  'dataloading',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'error',
  'idle',
  'load',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemouve',
  'mouseout',
  'mouseover',
  'mouseup',
  'move',
  'moveend',
  'movestart',
  'pitch',
  'pitchend',
  'pitchstart',
  'remove',
  // 'render',
  'resize',
  'rotate',
  'rotateend',
  'rotatestart',
  'sourcedata',
  'sourcedataloading',
  'styledata',
  'styledataloading',
  'styleimagemissing',
  'touchcancel',
  'touchend',
  'touchstart',
  'webglcontextlost',
  'webglcontextrestored',
  'wheel',
  'zoom',
  'zoomend',
  'zoomstart'
];
export const MapEmits = [
  ...MapGlEvents, 
  'update:center',
  'update:flyToOptions',
  'update:zoom',
  'update:pitch',
  'update:bearing',
  'loaded'
];

export const registerMapEvents = async (vmb_map:Deferred<Map>, instance:ComponentInternalInstance) => {
  const map = await vmb_map.promise;
  duplicateEvents<Map>(map, instance, MapGlEvents);
  
  instance.emit('loaded', map);
  
  map.on('zoomend', evt => {
    instance.emit('update:zoom', evt.target.getZoom());
    instance.emit('update:center', evt.target.getCenter().toArray());
  });

  map.on('dragend', evt => {
    instance.emit('update:center', evt.target.getCenter().toArray());
  });

  map.on('pitchend', evt => {
    instance.emit('update:pitch', evt.target.getPitch());
  });

  map.on('rotateend', evt => {
    instance.emit('update:bearing', evt.target.getBearing());
  });

};