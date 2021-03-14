import { Marker, Popup, PopupOptions, Map, LngLatLike } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref } from 'vue';
import { ComponentInternalInstance } from 'vue';

import { parentIsMarker } from './MapboxMarker';
import { GeogeometryType } from '../classes/Geogeomerty';
import { parentIsGeogeometry } from './MapboxGeogeometry';
import { duplicateEvents, filterObject } from './VueHelpers';
import { MapboxPopupInput } from '../classes/Popup';

export const attachToMarker = async (instance: any, vmb_marker: Deferred<Marker> | null, popup:Popup) => {
  if(vmb_marker){
    const marker = await vmb_marker.promise;
    marker.setPopup(popup);
  }
};

export const attachToGeogeometry = async (vmb_map: Deferred<Map>, vmb_geo: GeogeometryType | null, popup:Popup) => {
  if(vmb_geo){
    const map = await vmb_map.promise;
    map.on('click', vmb_geo.id, e => {
      const coordinates = vmb_geo.center;
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
  vmb_geogeometry: GeogeometryType | null,  
  content: Ref<any>
) => {
  const map = await vmb_map.promise;
  const popup = vmb_popup;

  popup.setDOMContent(content.value);

  if(parentIsMarker(instance))
    await attachToMarker(instance, vmb_marker, popup);
  else if (parentIsGeogeometry(instance)){
    await attachToGeogeometry(vmb_map, vmb_geogeometry, popup);
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