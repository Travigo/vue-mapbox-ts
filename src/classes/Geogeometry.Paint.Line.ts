import { filterObject } from '../services/VueHelpers';
import { FillLayer, FillPaint, LineLayer, LinePaint, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { GeogeometryPaint, GeogeometryPaintInput } from './Geogeometry.Paint';
import { GeogeometryType } from './Geogeometry';

export interface GeogeometryLineInput extends GeogeometryPaintInput {
  blur?: number;
  cap?: CanvasLineCap;
  join?: CanvasLineJoin;
  width?: number;
  color?: string;
  opacity?: number;
  translate?: [number, number];
  offset?: number;
}


let linesAdded = 0;
export class GeogeometryLine extends GeogeometryPaint {
  color: string;
  opacity: number;
  blur?: number;
  cap?: CanvasLineCap;
  join?: CanvasLineJoin;
  width?: number;
  translate?: [number, number];
  offset?: number;

  constructor(input:GeogeometryLineInput){
    super(input);
    
    this.color = input.color || '#000';
    this.opacity = typeof input.opacity === 'number' ? input.opacity : 0.6;

    if(input.geoId){
      this.geoId = input.geoId;
    }
    if(typeof input.blur === 'number')
      this.blur = input.blur;
    if(input.cap)
      this.cap = input.cap;
    if(input.join)
      this.join = input.join;
    if(typeof input.width === 'number')
      this.width = input.width;
    if(input.translate)
      this.translate = input.translate;
    if(typeof input.offset === 'number')
      this.offset = input.offset;
  }

  getPaint():LinePaint{
    const paintRaw = {
      'line-blur': this.blur,
      'line-cap': this.cap,
      'line-join': this.join,
      'line-opacity': this.join,
      'line-color': this.color,
      'line-width': this.width,
      'line-translate': this.translate,
      'line-offset': this.offset
    } as LinePaint;

    const paint = filterObject(paintRaw);    

    return paint;
  }

  init():GeogeometryLine{
    super._init('line', linesAdded++);
    return this;
  }

  async update(props:Partial<GeogeometryLineInput>, vmb_map:Deferred<Map>){
    const map = await vmb_map.promise;
    const opts = filterObject(props);
    if(this.id){
      if(opts.color && opts.color !== this.color)
        map.setPaintProperty(this.id, 'line-color', opts.color);
      if(typeof opts.blur === 'number' && opts.blur !== this.blur)
        map.setPaintProperty(this.id, 'line-blur', opts.blur);
      if(opts.cap && opts.cap !== this.cap)
        map.setPaintProperty(this.id, 'line-cap', opts.cap);
      if(opts.join && opts.join !== this.join)
        map.setPaintProperty(this.id,'line-join', this.join);
      if(typeof opts.opacity === 'number' && opts.opacity !== this.opacity)
        map.setPaintProperty(this.id, 'line-opacity', opts.opacity);
      if(typeof opts.width === 'number' && opts.width !== this.width)
        map.setPaintProperty(this.id,'line-width', opts.width);
      if(opts.translate)
        map.setPaintProperty(this.id, 'line-translate', opts.translate);
      if(typeof opts.offset === 'number')
        map.setPaintProperty(this.id, 'line-offset', opts.offset);
    }
  }

  getLayer():LineLayer{
    if(this.id){
      return {
        id: this.id,
        type: 'line',
        source: this.geoId,
        layout: {},
        paint: this.getPaint()
      };  
    } else {
      throw new Error('Geogeometry.Paint.Line: Cannot get Layer. Not initialized');
    }
    
  }
}