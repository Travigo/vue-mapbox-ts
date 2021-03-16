import { Geogeometry, GeogeometryInput, GeogeometryType } from '../classes/Geogeometry';
import { GeoJsonTypes } from 'geojson';
import { FillPaint, GeoJSONSource, GeoJSONSourceRaw, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { filterObject, parentNameContains } from './VueHelpers';
import { GeoJSON } from 'geojson';
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
  map.addLayer(geogeometry.getLayer());
};

export const updateGeogeometry = async (props:Partial<GeogeometryInput>, vmb_map:Deferred<Map>, vmb_geogeometry:GeogeometryType) => {
  const map = await vmb_map.promise;
  const geo = vmb_geogeometry;
  const opts = filterObject(props);  
  const source = (map.getSource(geo.id) as any);
  
  if(opts.fillColor && geo.fillColor !== opts.fillColor)
    map.setPaintProperty(geo.id, 'fill-color', opts.fillColor);
  if(typeof opts.antialias === 'boolean' && geo.antialias !== opts.antialias)
    map.setPaintProperty(geo.id, 'fill-antialias', opts.antialias);
  if(typeof opts.opacity ==='number' && geo.opacity !== opts.opacity)
    map.setPaintProperty(geo.id, 'fill-opacity', opts.opacity);
  if(opts.outlineColor && geo.outlineColor !== opts.outlineColor)
    map.setPaintProperty(geo.id, 'fill-outline-color', opts.outlineColor);  
    
  geo.updateOptions(opts);
  source.setData(geo.getGeoJSON().data);
};