import { Icon, IconOptions } from '@/classes/Icon';
import { Map, Marker } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { ComponentInternalInstance } from 'vue';
import { parentIsMarker } from './MapboxMarker';

export const getMapboxIconOptions = (props:IconOptions):IconOptions => {
  const { pixelRatio, sdf } = props;
  return { pixelRatio, sdf };
};

export const mountMapboxIcon = async (icon:Icon, vmb_map:Deferred<Map>, vmb_marker:Deferred<Marker> | null, instance: ComponentInternalInstance) => {
  if(icon.icon.value){
    const map = await vmb_map.promise;
    if(parentIsMarker(instance))
      return;
  }
};