import { Map } from 'mapbox-gl';

export const removeLayerIfPresent = (id:string, map:Map):void => {
  const layer = map.getLayer(id);
  if(layer)
    map.removeLayer(id);
}; 