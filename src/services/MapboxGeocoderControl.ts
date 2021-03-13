import Deferred from 'my-deferred';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxGeocoder, { GeocoderOptions, Result, Results } from '@mapbox/mapbox-gl-geocoder';

import { filterObject, parentsNameIs } from '../services/VueHelpers';
import { ComponentInternalInstance } from 'vue';


export const mountGeocoderControl = async (vmb_map:Deferred<Map> | null, vmb_geocoder:Deferred<MapboxGeocoder>, props:GeocoderOptions, instance: ComponentInternalInstance):Promise<void> => {
  const map = vmb_map ? await vmb_map.promise : null;
  const options = getGeocoderControlOptions(props);
  const geocoder = new MapboxGeocoder(options);
  
  if(parentsNameIs(instance, 'MapboxMap') && map)
    map.addControl(geocoder);
  else{
    if(instance.parent)
      geocoder.addTo(instance.refs.geocoder as HTMLElement);
  }
  window.MapboxGeocoder = MapboxGeocoder;
  (window as any).geocoder = geocoder;

  vmb_geocoder.resolve(geocoder);
};

export const mountGeocoderEvents = async (vmb_geocoder:Deferred<MapboxGeocoder>, instance: ComponentInternalInstance ) => {
  const geocoder = await vmb_geocoder.promise;
  
  geocoder.on('result', (res:{result: Result}) => {
    instance.emit('result', res.result);
  });

  geocoder.on('results', (res:Results) => {
    instance.emit('results', res);
  });

  geocoder.on('error', (err: string ) => {
    instance.emit('error', err);
  });

  geocoder.on('loading', (query:any) => {
    instance.emit('loading', query);
  });
};


export const getGeocoderControlOptions = (props:GeocoderOptions):GeocoderOptions => {
  const options = filterObject<GeocoderOptions>(props);

  options.accessToken = props.accessToken || mapboxgl.accessToken;
  options.mapboxgl = mapboxgl as any;
  
  return options as GeocoderOptions;
};