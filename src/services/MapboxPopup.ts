import { Marker, Popup, PopupOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref } from 'vue';
import { ComponentInternalInstance } from 'vue';

import { parentIsMarker } from './MapboxMarker';
import { parentIsGeogeometry } from './MapboxGeogeometry';
import { duplicateEvents, filterObject } from './VueHelpers';
import { MapboxPopupInput } from '../classes/Popup';
import { GeogeometryPaintType } from '../classes/Geogeometry.Paint';

export const attachToMarker = async (instance: any, vmb_marker: Deferred<Marker> | null, popup:Popup) => {
  if(vmb_marker){
    const marker = await vmb_marker.promise;
    marker.setPopup(popup);
  }
};

export const attachToGeogeometry = async (
  vmb_map: Deferred<Map>, 
  vmb_geo_paint: Deferred<GeogeometryPaintType>, 
  popup:Popup
) => {
  const paint = await vmb_geo_paint.promise;
  const map = await vmb_map.promise;
  if(paint.id){    
    const geo = await paint.geogeometry.promise;    
    
    map.on('click', paint.id, e => {
      const coordinates = geo.center;
      popup
        .setLngLat(coordinates)
        .addTo(map);
    });
  }
};

export const getPopupOptions = (props: Partial<PopupOptions>): PopupOptions =>
  filterObject(props, [
    'closeButton',
    'closeOnClick',
    'closeOnMove',
    'focusAfterOpen',
    'anchor',
    'offset',
    'className',
    'maxWidth'
  ]);

export const mountPopup = async (
// instance: ComponentInternalInstance | null,

  instance: any | null,
  vmb_map: Deferred<Map>,
  vmb_popup: Popup, 
  vmb_marker:Deferred<Marker> | null,
  vmb_geogeometry_paint: Deferred<GeogeometryPaintType> | null,  
  content: Ref<any>
) => {
  const map = await vmb_map.promise;
  const popup = vmb_popup;

  popup.setDOMContent(content.value);

  if(parentIsMarker(instance))
    await attachToMarker(instance, vmb_marker, popup);
  else if (parentIsGeogeometry(instance) && vmb_geogeometry_paint){    
    await attachToGeogeometry(vmb_map, vmb_geogeometry_paint, popup);
  }
  else{
    popup.addTo(map);
  }
};

export const PopupGlEvents = ['close', 'open'];
export const PopupEmits = [...PopupGlEvents];

export const registerPopupEvents = (vmb_popup:Popup, instance:ComponentInternalInstance) => {
  duplicateEvents(vmb_popup, instance, PopupGlEvents);
};

export const updatePopup = async (props:MapboxPopupInput, vmb_popup:Popup) => {
  const opts = getPopupOptions(props);

  if(opts.maxWidth)
    vmb_popup.setMaxWidth(opts.maxWidth);
  
  if(opts.offset)
    vmb_popup.setOffset(opts.offset);

  if(props.lngLat)
    vmb_popup.setLngLat(props.lngLat);
};