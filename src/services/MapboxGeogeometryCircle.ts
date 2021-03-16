import { Circle } from '../classes/GeogeometryCircle';
import { GeoJSONSource, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { removeLayerIfPresent } from './MapboxLayer';
import { removeSourceIfPresent } from './MapboxSource';
import { GeogeometryInput } from '../classes/Geogeometry';

export const metersToPixelsAtMaxZoom = (meters:number, latitude:number):number =>
  meters / 0.075 / Math.cos(latitude * Math.PI / 180);