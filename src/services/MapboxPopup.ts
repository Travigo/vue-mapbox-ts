import { Marker, Popup, PopupOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { ComponentInternalInstance, getCurrentInstance, Ref } from 'vue';


export const parentIsMarker = (instance:any):boolean => instance.parent.provides.vmb_marker;

export const attachToMarker = async (instance: any, vmb_marker: Deferred<Marker> | null, popup:Popup) => {
  if(vmb_marker){
    const marker = await vmb_marker.promise;
    marker.setPopup(popup);
  }
  
};

export const getPopupOptions = (props: Partial<PopupOptions>): PopupOptions => {
  const {
    closeButton,
    closeOnClick,
    closeOnMove,
    focusAfterOpen,
    anchor,
    offset,
    className,
    maxWidth
  } = props;

  return {
    closeButton,
    closeOnClick,
    closeOnMove,
    focusAfterOpen,
    anchor,
    offset,
    className,
    maxWidth
  };
};

export const mountPopup = async (
  instance: ComponentInternalInstance | null,
  vmb_popup: Popup, 
  vmb_marker:Deferred<Marker> | null, 
  vmb_map: Deferred<Map>,
  content: Ref<any>
) => {
  const map = await vmb_map.promise;
  const popup = vmb_popup;

  popup.setDOMContent(content.value);

  if(parentIsMarker(instance))
    await attachToMarker(instance, vmb_marker, popup);
  else{
    popup.addTo(map);
  }

};