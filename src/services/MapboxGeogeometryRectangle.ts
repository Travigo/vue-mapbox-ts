import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { removeLayerIfPresent } from './MapboxLayer';
import { removeSourceIfPresent } from './MapboxSource';
import { Rectangle } from '../classes/GeogeometryRectangle';

export const updateRectangle = async (vmb_map:Deferred<Map>, vmb_rectangle: Rectangle) => {
  const map = await vmb_map.promise;
  const rectangle = vmb_rectangle;

  removeLayerIfPresent(rectangle.id, map);
  removeSourceIfPresent(rectangle.id, map);

  map.addSource(rectangle.id, rectangle.getGeoJSON());
  map.addLayer({
    'id': rectangle.id,
    'type': 'fill',
    'source': rectangle.id,
    'layout': {},
    'paint': rectangle.getPaint()
  });
};
