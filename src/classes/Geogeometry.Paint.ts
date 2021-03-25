import { removeLayerIfPresent } from '../services/MapboxLayer';
import { AnyLayer, AnyPaint, AnySourceData, FillPaint, GeoJSONSource, GeoJSONSourceRaw, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { provide } from 'vue';
import { GeogeometryFill, GeogeometryFillInput } from './Geogeometry.Paint.Fill';
import { GeogeometryLine } from './Geogeometry.Paint.Line';
import { GeogeometryType } from './Geogeometry';

export type GeogeometryPaintType = GeogeometryFill | GeogeometryLine;

export interface GeogeometryPaintInput {
  geogeometry: Deferred<GeogeometryType>
  geoId?: string;  
}
export class GeogeometryPaint {
  geoId?: string;
  id?: string;
  geogeometry: Deferred<GeogeometryType>;
  deferred: Deferred<GeogeometryPaintType>;

  static getPaint: () => AnyPaint;
  static update: (...args:any) => void | Promise<void>;
  static getLayer: () => AnyLayer;

  constructor(input: GeogeometryPaintInput){
    this.geogeometry = input.geogeometry;
    this.deferred = new Deferred<GeogeometryPaintType>();

    provide('vmb_geogeometry_paint', this.deferred);
  }

  async _init(paintType: string, id:string|number){
    const geogeometry = await this.geogeometry.promise;
    this.geoId = geogeometry.id;
    this.id = `${this.geoId}-${paintType}-${id}`;
  }

  setGeoId(id:string){
    this.geoId = id;
  }
}
