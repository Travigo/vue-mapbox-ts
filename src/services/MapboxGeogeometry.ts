import { GeogeometryInput, GeogeometryType } from '../classes/Geogeometry';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { filterObject, parentNameContains } from './VueHelpers';
import { removeLayerIfPresent } from './MapboxLayer';
import { removeSourceIfPresent } from './MapboxSource';

export const parentIsGeogeometry = (instance:any):boolean => 
  parentNameContains(instance, 'MapboxGeogeometry');

export const distanceToLat = (km:number):number => 
  km/110.574;

export const distanceToLong = (km:number, lat: number) =>
  km/(Math.cos(lat*Math.PI/180)*111.32);

export const mountGeogeometry = async (vmb_map:Deferred<Map>, vmb_geogeometry: GeogeometryType) => {
  const map = await vmb_map.promise;
  const geogeometry = vmb_geogeometry;

  removeLayerIfPresent(geogeometry.id, map);
  removeSourceIfPresent(geogeometry.id, map);

  map.addSource(geogeometry.id, geogeometry.getGeoJSON());
  // map.addLayer(geogeometry.getLayer());
};

export const updateGeogeometry = async (props:Partial<GeogeometryInput>, vmb_map:Deferred<Map>, vmb_geogeometry:GeogeometryType) => {
  const map = await vmb_map.promise;
  const geo = vmb_geogeometry;
  const opts = filterObject(props);  
  const source = (map.getSource(geo.id) as any);
    
  geo.updateOptions(opts);
  source.setData(geo.getGeoJSON().data);
};