import { AttributionControllOptions } from '../classes/AttributionControl';
import { AttributionControl, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { filterObject } from './VueHelpers';

export const getAttributionControlOptions = (props:Record<string,any>):AttributionControllOptions => 
  filterObject(props as AttributionControllOptions);


export const mountAttributionControl = async (
  vmb_map: Deferred<Map>, 
  vmb_attributionControl: AttributionControl,
) => {
  const map = await vmb_map.promise;
  map.addControl(vmb_attributionControl);
};