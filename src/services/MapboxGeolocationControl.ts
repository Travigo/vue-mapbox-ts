import { GeolocationControlOptions } from '../classes/GeolocationControl';
import { filterObject } from './VueHelpers';

export const getGeolocationControlOptions = (
  props:GeolocationControlOptions
):GeolocationControlOptions => 
  filterObject(props);

