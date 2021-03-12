import { Polygon } from '../classes/GeogeometryPolygon';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { removeLayerIfPresent } from './MapboxLayer';
import { removeSourceIfPresent } from './MapboxSource';

export const updatePolygon = async (vmb_map:Deferred<Map>, vmb_polygon: Polygon) => {
  const map = await vmb_map.promise;
  const polygon = vmb_polygon;

  removeLayerIfPresent(polygon.id, map);
  removeSourceIfPresent(polygon.id, map);

  map.addSource(polygon.id, polygon.getGeoJSON());
  map.addLayer({
    'id': polygon.id,
    'type': 'fill',
    'source': polygon.id,
    'layout': {},
    'paint': polygon.getPaint()
  });
};
