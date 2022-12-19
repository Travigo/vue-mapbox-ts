import { filterObject } from '../services/VueHelpers';
import { FillLayer, FillPaint, LineLayer, LineLayout, LinePaint, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { GeogeometryPaint, GeogeometryPaintInput } from './Geogeometry.Paint';
import deepEqual from 'fast-deep-equal';

export interface GeogeometryLineInput extends GeogeometryPaintInput {
  blur?: number;
  cap?: CanvasLineCap;
  join?: CanvasLineJoin;
  width?: number;
  color?: string;
  opacity?: number;
  translate?: [number, number];
  offset?: number;
  dasharray?: number[];
  gapWidth?: number;
  gradient?: string;
  miterLimit?: number;
  roundLimit?: number;
  sortKey?: number;
  translateAnchor?: TranslateAnchor;
}

export type TranslateAnchor = 'map' | 'viewport';

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
  dasharray?: number[];
  gapWidth?: number;
  gradient?: string;
  miterLimit?: number;
  roundLimit?: number;
  sortKey?: number;
  translateAnchor?: TranslateAnchor;

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
    if(input.dasharray)
      this.dasharray = input.dasharray;
    if(typeof input.gapWidth === 'number')
      this.gapWidth = input.gapWidth;
    if(input.gradient)
      this.gradient = input.gradient;
    if(typeof input.miterLimit === 'number')
      this.miterLimit = input.miterLimit;
    if(typeof input.roundLimit === 'number')
      this.roundLimit = input.roundLimit;
    if(typeof input.sortKey === 'number')
      this.sortKey = input.sortKey;
    if(input.translateAnchor)
      this.translateAnchor = input.translateAnchor;
  }

  getPaint():LinePaint{
    const paintRaw = {
      'line-blur': this.blur,      
      'line-opacity': this.opacity,
      'line-color': this.color,
      'line-width': this.width,
      'line-translate': this.translate,
      'line-offset': this.offset,
      'line-dasharray': this.dasharray,
      'line-gap-width': this.gapWidth,      
      'line-translate-anchor': this.translateAnchor,      
    } as LinePaint;

    const paint = filterObject(paintRaw);    
    console.log(paint);
    return paint;
  }

  getLayout():LineLayout{
    const layoutRaw = {
      'line-cap': this.cap,
      'line-join': this.join,
      'line-miter-limit': this.miterLimit,
      'line-round-limit': this.roundLimit,
      'line-sort-key': this.sortKey,

    } as LineLayout;

    const layout = filterObject(layoutRaw);
    console.log(layout);
    return layout;
  }

  init():GeogeometryLine{
    super._init('line', linesAdded++);
    return this;
  }

  async update(props:Partial<GeogeometryLineInput>, vmb_map:Deferred<Map>){
    const map = await vmb_map.promise;
    const opts = filterObject(props);
    if(this.id){
      if(opts.color && opts.color !== this.color){
        map.setPaintProperty(this.id, 'line-color', opts.color);
        this.color = opts.color;        
      }
        
      if(typeof opts.blur === 'number' && opts.blur !== this.blur){
        map.setPaintProperty(this.id, 'line-blur', opts.blur);
        this.blur = opts.blur;
      }
        
      if(opts.cap && opts.cap !== this.cap){
        map.setPaintProperty(this.id, 'line-cap', opts.cap);
        this.cap = opts.cap;
      }
        
      if(opts.join && opts.join !== this.join){
        map.setPaintProperty(this.id,'line-join', opts.join);
        this.join = opts.join;
      }
        
      if(typeof opts.opacity === 'number' && opts.opacity !== this.opacity){
        map.setPaintProperty(this.id, 'line-opacity', opts.opacity);
        this.opacity = opts.opacity;
      }
        
      if(typeof opts.width === 'number' && opts.width !== this.width){
        map.setPaintProperty(this.id,'line-width', opts.width);
        this.width = opts.width;
      }
        
      if(opts.translate && this.translate && (opts.translate[0] !== this.translate[0] || opts.translate[1] !== this.translate[1])){
        map.setPaintProperty(this.id, 'line-translate', opts.translate);
        this.translate = opts.translate;
      }
        
      if(typeof opts.offset === 'number' && this.offset !== opts.offset){
        map.setPaintProperty(this.id, 'line-offset', opts.offset);
        this.offset = opts.offset;
      }
        
      if(opts.dasharray && !deepEqual(this.dasharray, opts.dasharray)){
        map.setPaintProperty(this.id, 'line-dasharray', opts.dasharray);
        this.dasharray = opts.dasharray;
      }
        
      if(typeof opts.gapWidth === 'number' && this.gapWidth !== opts.gapWidth){
        map.setPaintProperty(this.id, 'line-gap-width', opts.gapWidth);
        this.gapWidth = opts.gapWidth;
      }
        
      // if(opts.gradient && this.gradient !== opts.gradient){
      //   map.setPaintProperty(this.id, 'line-gradient', opts.gradient);
      //   this.gradient = opts.gradient;
      // }
        
      if(typeof opts.miterLimit === 'number' && this.miterLimit !== opts.miterLimit){
        map.setPaintProperty(this.id, 'line-miter-limit', opts.miterLimit);
        this.miterLimit = opts.miterLimit;
      }
        
      if(typeof opts.roundLimit === 'number' && this.roundLimit !== opts.roundLimit){
        map.setPaintProperty(this.id, 'line-round-limit', opts.roundLimit);
        this.roundLimit = opts.roundLimit;
      }
        
      if(typeof opts.sortKey === 'number'){
        map.setPaintProperty(this.id, 'line-sort-key', opts.sortKey);
        this.sortKey = opts.sortKey;
      }
        
      if(opts.translateAnchor && this.translateAnchor !== opts.translateAnchor){
        map.setPaintProperty(this.id, 'line-translate-anchor', opts.translateAnchor);
        this.translateAnchor = opts.translateAnchor;
      }
    }
  }

  getLayer():LineLayer{
    if(this.id){
      return {
        id: this.id,
        type: 'line',
        source: this.geoId,
        layout: this.getLayout(),
        paint: this.getPaint()
      };  
    } else {
      throw new Error('Geogeometry.Paint.Line: Cannot get Layer. Not initialized');
    }
    
  }
}