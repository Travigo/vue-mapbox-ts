import { Map } from 'mapbox-gl';

export const removeSourceIfPresent = (id:string, map:Map) => {
  const source = map.getSource(id);
  if(source)
    map.removeSource(id);
}; 