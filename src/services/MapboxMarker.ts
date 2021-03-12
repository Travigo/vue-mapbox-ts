import LngLatInput from '../classes/LngLatInput';
import mapboxgl, { MapboxOptions, Map, Marker, MarkerOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Component, Ref, ComponentInternalInstance } from 'vue';
import { parentsNameIs, slotIsNotEmpty } from './VueHelpers';


export const parentIsMarker = (instance:any):boolean => 
  parentsNameIs(instance, 'MapboxMarker');

export const getMarkerOptions = (props: MarkerOptions): MarkerOptions => {
  const { 
    element,
    offset,
    anchor,
    color,
    draggable,
    clickTolerance,
    rotation,
    rotationAlignment,
    pitchAlignment,
    scale
  } = props; 

  return {
    element,
    offset,
    anchor,
    color,
    draggable,
    clickTolerance,
    rotation,
    rotationAlignment,
    pitchAlignment,
    scale
  };
};

const getPopupChildren = (marker: any): Component | null => {  
  for (const child of marker.$children){
    if(child.$vnode.tag && child.$vnode.tag.includes('MapboxPopup'))
      return (child);
  }
  return null;
};

const addPopupToMapIfPresent = (markerComponent: any, marker: mapboxgl.Marker) => {
  const popup: any = getPopupChildren(markerComponent);  
  if(popup){
    const mbPopup: mapboxgl.Popup = popup.$popup;

    marker
      .setPopup(mbPopup);
  }
};

const registerMarkerEvents = (marker: mapboxgl.Marker, component: ComponentInternalInstance) => {
  marker.on('drag', (evt: any) => {
    const { lng, lat } = evt.target._lngLat;
    (component as any)._lngLat = [lng, lat];
    component.emit('drag', evt);
  });

  marker.on('dragend', (evt: any) => {
    component.emit('dragend', evt);
  });

  marker.on('dragstart', (evt: any) => {
    component.emit('dragstart', evt);
  });

  marker.getElement().addEventListener('click', _ev => {
    component.emit('click', marker);
  });
};

export const mountMarker = (options:MarkerOptions, vmb_map:Deferred<Map>, vmb_marker:Deferred<Marker>, instance: ComponentInternalInstance, lngLat: LngLatInput, element?: Ref<HTMLElement>) =>
  (async () => {
    const map = await vmb_map.promise;
    if(element && slotIsNotEmpty(element.value))
      options.element = element.value;

    const marker = new Marker(options)
      .setLngLat(lngLat);

    registerMarkerEvents(marker, instance);
    marker.addTo(map);

    vmb_marker.resolve(marker);
  })();