import { Circle } from '../classes/GeogeometryCircle';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { removeLayerIfPresent } from './MapboxLayer';
import { removeSourceIfPresent } from './MapboxSource';

export const metersToPixelsAtMaxZoom = (meters:number, latitude:number):number =>
  meters / 0.075 / Math.cos(latitude * Math.PI / 180);

export const updateCircle = async (vmb_map:Deferred<Map>, vmb_circle: Circle) => {
  const map = await vmb_map.promise;
  const circle = vmb_circle;

  removeLayerIfPresent(circle.id, map);
  removeSourceIfPresent(circle.id, map);

  map.addSource(circle.id, circle.getGeoJSON());
  map.addLayer({
    'id': circle.id,
    'type': 'fill',
    'source': circle.id,
    'layout': {},
    'paint': circle.getPaint()
  });
};