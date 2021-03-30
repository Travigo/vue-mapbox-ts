import Deferred from 'my-deferred';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxGeocoder, { GeocoderOptions, Result, Results } from '@mapbox/mapbox-gl-geocoder';

import { filterObject, parentsNameIs, slotIsNotEmpty } from '../services/VueHelpers';
import { GeocoderComponentInstance } from '../classes/GeocoderControl';

export const mountGeocoderControl = async (vmb_map:Deferred<Map> | null, vmb_geocoder:Deferred<MapboxGeocoder>, props:GeocoderOptions, instance: GeocoderComponentInstance):Promise<void> => {
  const map = vmb_map ? await vmb_map.promise : null;
  const options = getGeocoderControlOptions(props);
  const geocoder = new MapboxGeocoder(options);
  
  if(parentsNameIs(instance, 'MapboxMap') && map)
    map.addControl(geocoder);
  else{
    if(instance.parent)
      geocoder.addTo(instance.refs.geocoder as HTMLElement);
    
    if(slotIsNotEmpty(instance.refs['custom-input'] as HTMLElement)){
      attachToInput(instance.refs['custom-input'] as HTMLElement, geocoder, instance);
    }
  }
  window.MapboxGeocoder = MapboxGeocoder;
  (window as any).geocoder = geocoder;

  vmb_geocoder.resolve(geocoder);
};

export const mountGeocoderEvents = async (vmb_geocoder:Deferred<MapboxGeocoder>, instance: GeocoderComponentInstance ) => {
  const geocoder = await vmb_geocoder.promise;
  
  geocoder.on('result', (res:{result: Result}) => {
    instance.emit('result', res.result);
    instance.proxy.geocoderState.result = res.result;
  });

  geocoder.on('results', (res:Results) => {
    instance.emit('results', res);
    instance.proxy.geocoderState.results = res;
  });

  geocoder.on('error', (err: string ) => {
    instance.emit('error', err);
    instance.proxy.geocoderState.error = err;
  });

  geocoder.on('loading', (query:any) => {
    instance.emit('loading', query);
    instance.proxy.geocoderState.loading = query;
  });
};


export const getGeocoderControlOptions = (props:GeocoderOptions):GeocoderOptions => {
  const options = filterObject<GeocoderOptions>(props);

  options.accessToken = props.accessToken || mapboxgl.accessToken;
  options.mapboxgl = mapboxgl as any;
  
  return options as GeocoderOptions;
};



export const attachToInput = (ref:HTMLElement, geocoder: MapboxGeocoder, instance: GeocoderComponentInstance) => {
  if(instance && instance.proxy){
    if(instance.proxy.showOriginalGeocoder)
      instance.proxy.showOriginalGeocoder = false;
    // instance.setupState.showOriginalGeocoder = false;
    let inputs = ref.getElementsByTagName('input');  
  
    if(!inputs )
      throw new Error('MapboxGeocoderControl: No inputs found');
  
    const input = inputs[0];
  
    input.addEventListener('keyup', (evt) => {
      geocoder.query(input.value);
    });
  }
  
};