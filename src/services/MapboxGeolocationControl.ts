import { GeolocationControlOptions } from '../classes/GeolocationControl';

export const getGeolocationControlOptions = (
  props:GeolocationControlOptions
):GeolocationControlOptions => {
  const {
    fitBoundsOptions,
    positionOptions,
    showAccuracyCircle,
    showUserLocation,
    trackUserLocation
  } = props;

  return {
    fitBoundsOptions,
    positionOptions,
    showAccuracyCircle,
    showUserLocation,
    trackUserLocation
  };
};
