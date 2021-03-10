import { AttributionControllOptions } from '../classes/AttributionControl';
import { AttributionControl, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';

export const getAttributionControlOptions = (props:AttributionControllOptions):AttributionControllOptions => {
  const {
    compact,
    customAttribution
  } = props;
  return {
    compact,
    customAttribution
  };
};

export const mountAttributionControl = async (
  vmb_map: Deferred<Map>, 
  vmb_attributionControl: AttributionControl
) => {
  const map = await vmb_map.promise;
  map.addControl(vmb_attributionControl);
};