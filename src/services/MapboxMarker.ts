import LngLatInput from '../classes/LngLatInput';
import mapboxgl, { Map, Marker, MarkerOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { ComponentInternalInstance } from 'vue';
import { Ref } from 'vue';
import { duplicateEvents, filterObject, parentsNameIs, slotIsNotEmpty } from './VueHelpers';
import { MarkerProps } from '../classes/Marker';


export const parentIsMarker = (instance:any):boolean => 
  parentsNameIs(instance, 'MapboxMarker');

export const getMarkerOptions = (props: MarkerOptions): MarkerOptions => 
  filterObject(props, [
    'element',
    'offset',
    'anchor',
    'color',
    'draggable',
    'clickTolerance',
    'rotation',
    'rotationAlignment',
    'pitchAlignment',
    'scale'
  ]);

export const MarkerGlEvents = ['drag', 'dragend', 'dragstart'];
export const MarkerEmits = [...MarkerGlEvents, 'update:lngLat', 'click'];

export const registerMarkerEvents = (marker: mapboxgl.Marker, component: ComponentInternalInstance) => {
  duplicateEvents<Marker>(marker, component, MarkerGlEvents);
  
  marker.on('dragend', (evt: any) => 
    component.emit('update:lngLat', evt.target._lngLat.toArray())
  );

  marker.getElement().addEventListener('click', _ev => {
    component.emit('click', marker);
  });
};

export const updateMarker = async (props:MarkerProps, vmb_marker:Deferred<Marker>) => {
  const marker = await vmb_marker.promise;
  const opts = filterObject(props);

  if(typeof opts.draggable === 'boolean')
    marker.setDraggable(opts.draggable);

  if(opts.lngLat)
    marker.setLngLat(opts.lngLat);

  if(opts.offset)
    marker.setOffset(opts.offset);

  if(opts.rotation)
    marker.setRotation(opts.rotation);
  
  if(opts.pitchAlignment)
    marker.setPitchAlignment(opts.pitchAlignment);

  if(opts.rotationAlignment)
    marker.setRotationAlignment(opts.rotationAlignment);    
};

export const mountMarker = async (options:MarkerOptions, vmb_map:Deferred<Map>, vmb_marker:Deferred<Marker>, instance: ComponentInternalInstance, lngLat: LngLatInput, element?: Ref<HTMLElement>) => {
  const map = await vmb_map.promise;
  if(element && slotIsNotEmpty(element.value))
    options.element = element.value;

  const marker = new Marker(options)
    .setLngLat(lngLat);
  
  marker.addTo(map);

  vmb_marker.resolve(marker);
};

export const updateOffset = async (vmb_marker:Deferred<Marker>, color:string) => {
  const marker = await vmb_marker.promise;
};