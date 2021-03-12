import { parentNameContains } from './VueHelpers';

export const parentIsGeogeometry = (instance:any):boolean => 
  parentNameContains(instance, 'MapboxGeogeometry');

export const distanceToLat = (km:number):number => 
  km/110.574;

export const distanceToLong = (km:number, lat: number) =>
  km/(Math.cos(lat*Math.PI/180)*111.32);
