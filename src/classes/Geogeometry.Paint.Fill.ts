import { filterObject } from '../services/VueHelpers';
import { FillLayer, FillPaint, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { GeogeometryPaint, GeogeometryPaintInput } from './Geogeometry.Paint';

export interface GeogeometryFillInput extends GeogeometryPaintInput{
  color?: string;
  antialias?: boolean;
  opacity?: number;
  outlineColor?: string;
}


let fillsAdded = 0;
export class GeogeometryFill extends GeogeometryPaint {
  color: string;
  antialias: boolean;
  opacity: number;
  outlineColor?: string;

  constructor(input:GeogeometryFillInput){
    super(input);
    this.geoId = input.geoId;
    this.id=`${input.geoId}-fill-${fillsAdded++}`;
    this.color = input.color || '#4668F2';
    this.antialias = typeof input.antialias === 'boolean' ? input.antialias : true;
    this.opacity = typeof input.opacity === 'number' ? input.opacity : 0.6;
    if(input.outlineColor)
      this.outlineColor = input.outlineColor;
  }

  async init(){
    await super._init('fill',fillsAdded++);
  }

  getPaint():FillPaint{
    const paint = {} as FillPaint;

    if(this.color)
      paint['fill-color'] = this.color;
    if(this.antialias)
      paint['fill-antialias'] = this.antialias;
    if(this.opacity)
      paint['fill-opacity'] = this.opacity;
    if(this.outlineColor)
      paint['fill-outline-color'] = this.outlineColor;

    return paint;
  }

  async update(props:Partial<GeogeometryFillInput>, vmb_map:Deferred<Map>){
    const map = await vmb_map.promise;
    const opts = filterObject(props);
    if(this.id){
      if(opts.color && opts.color !== this.color)
        map.setPaintProperty(this.id, 'fill-color', opts.color);
      if(typeof opts.antialias === 'boolean' && opts.antialias !== this.antialias)
        map.setPaintProperty(this.id, 'fill-antialias', opts.antialias);
      if(typeof opts.opacity === 'number' && opts.opacity !== this.opacity)
        map.setPaintProperty(this.id, 'fill-opacity', opts.opacity);
      if(opts.outlineColor && opts.outlineColor !== this.outlineColor)
        map.setPaintProperty(this.id, 'fill-outline-color', opts.outlineColor);    
    }
    
  }

  getLayer():FillLayer{
    if(this.id){
      return {
        id: this.id,
        type: 'fill',
        source: this.geoId,
        layout: {},
        paint: this.getPaint()
      };  
    } else {
      throw new Error('Geogeometry.Paint.Fill: Cannot get layer. Not initialized');
    }
    
  }
}