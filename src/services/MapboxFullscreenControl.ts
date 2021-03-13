import { FullscreenControl, FullscreenControlOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { filterObject } from './VueHelpers';

export const getFullscreenControlOptions = (props: FullscreenControlOptions):FullscreenControlOptions => 
  filterObject(props);

export const mountFullscreenControl = async (vmb_fullscreenControl:FullscreenControl, vmb_map:Deferred<Map>):Promise<void> => {
  const map = await vmb_map.promise;
  map.addControl(vmb_fullscreenControl);
};