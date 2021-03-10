import { ScaleControlOptions } from '../classes/ScaleControl';
import { ScaleControl, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';

export const getScaleControlOptions = (props:ScaleControlOptions):ScaleControlOptions => {
  const { 
    maxWidth,
    unit
  } = props;

  return {
    maxWidth,
    unit
  };
};

export const mountScaleControl = async (vmb_map:Deferred<Map>, vmb_scaleControl: ScaleControl) => {
  const map = await vmb_map.promise;
  map.addControl(vmb_scaleControl);
};