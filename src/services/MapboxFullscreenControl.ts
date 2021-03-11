import { FullscreenControl, FullscreenControlOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';

export const getFullscreenControlOptions = (props: FullscreenControlOptions):FullscreenControlOptions => {
  const { container } = props;
  
  return { container };
};

export const mountFullscreenControl = async (vmb_fullscreenControl:FullscreenControl, vmb_map:Deferred<Map>):Promise<void> => {
  const map = await vmb_map.promise;
  map.addControl(vmb_fullscreenControl);
};