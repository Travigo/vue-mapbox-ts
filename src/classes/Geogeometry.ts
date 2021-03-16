import { removeLayerIfPresent } from '../services/MapboxLayer';
import { AnyLayer, AnyPaint, AnySourceData, FillPaint, GeoJSONSource, GeoJSONSourceRaw, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { Circle } from './GeogeometryCircle';
import { Polygon } from './GeogeometryPolygon';
import { Rectangle } from './GeogeometryRectangle';
import { Raw } from './GeogeometryRaw';

export interface GeogeometryInput {
  id: string;
  fillColor?: string;
  outlineColor?: string;
  opacity?: number;
  antialias?: boolean;
}
export class Geogeometry {
  id: string;
  public fillColor: string;
  outlineColor?: string;
  opacity?: number;
  antialias?: boolean;
  
  static getGeoJSON: () => GeoJSONSourceRaw;
  static center: [number, number];

  constructor(input: GeogeometryInput){
    this.id = input.id;
    this.fillColor = input.fillColor || '#4668F2';
    this.antialias = typeof input.antialias === 'boolean' ? input.antialias : true;
    this.opacity = typeof input.opacity === 'number' ? input.opacity : 0.6;
    
    if(input.outlineColor)
      this.outlineColor = input.outlineColor;
  }

  updateOptions(input:Partial<GeogeometryInput>){
    if(input.fillColor)
      this.fillColor = input.fillColor;
    if(typeof input.antialias === 'boolean')
      this.antialias = input.antialias;
    if(typeof input.opacity === 'number')
      this.opacity = input.opacity;
    if(input.outlineColor)
      this.outlineColor = input.outlineColor;
  }
  
  getPaint():AnyPaint{
    const paint = {} as FillPaint;

    if(this.fillColor)
      paint['fill-color'] = this.fillColor;
    if(this.antialias)
      paint['fill-antialias'] = this.antialias;
    if(this.opacity)
      paint['fill-opacity'] = this.opacity;
    if(this.outlineColor)
      paint['fill-outline-color'] = this.outlineColor;

    return paint;
  }  

  getLayer():AnyLayer {
    return {
      'id': this.id,
      'type': 'fill',
      'source': this.id,
      'layout': {},
      'paint': this.getPaint() as FillPaint
    }; 
  }
}

export type GeogeometryType = Circle | Polygon | Rectangle | Raw;
