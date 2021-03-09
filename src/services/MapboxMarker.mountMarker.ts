import mapboxgl, { MapboxOptions, Map, Marker, MarkerOptions } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Component, Ref } from 'vue';


const getMarkerOptions = (props: Partial<MarkerOptions>): MarkerOptions => {
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

const registerMarkerEvents = (marker: mapboxgl.Marker, component: any) => {
  marker.on('drag', (evt: any) => {
    const { lng, lat } = evt.target._lngLat;
    (component as any)._lngLat = [lng, lat];
    component.$emit('drag', evt);
  });

  marker.on('dragend', (evt: any) => {
    component.$emit('dragend', evt);
  });

  marker.on('dragstart', (evt: any) => {
    component.$emit('dragstart', evt);
  });

  marker.getElement().addEventListener('click', _ev => {
    component.$emit('click', marker);
  });
};

export default (props:Record<string,any>, vmb_map:Deferred<Map>, vmb_marker:Deferred<Marker>) =>
  (async () => {
    const map = await vmb_map.promise;
    const options = getMarkerOptions(props);
    const marker = new Marker(options)
      .setLngLat(props.lngLat);

    // addPopupToMapIfPresent()
  })();