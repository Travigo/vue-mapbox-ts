import { distanceToLat, distanceToLong } from '../services/MapboxGeogeometry';
import { AnySourceData, GeoJSONSourceRaw } from 'mapbox-gl';
import { Geogeometry, GeogeometryInput } from './Geogeometry';

export interface RectangleInput extends GeogeometryInput {
  width: number;
  height: number;
  center: [number, number];
}

export class Rectangle extends Geogeometry {
  width: number;
  height: number;
  center: [number, number];

  constructor(input:RectangleInput){
    super(input);
    this.width = input.width;
    this.height = input.height;
    this.center = input.center;
  }

  updateOptions(input:Partial<RectangleInput>){
    super.updateOptions(input);
    if(input.width)
      this.width = input.width;
    if(input.height)
      this.height = input.height;
  }

  getGeoJSON():GeoJSONSourceRaw{
    const long = distanceToLong(this.width, this.center[1]);
    const lat = distanceToLat(this.height);

    const path = [
      [this.center[0] + long/2, this.center[1] + lat/2],
      [this.center[0] + long/2 , this.center[1] - lat/2],
      [this.center[0] - long/2, this.center[1] - lat/2],
      [this.center[0] - long/2, this.center[1] + lat/2],
      [this.center[0] + long/2, this.center[1] + lat/2]
    ];

    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [path]
          },
          properties: {}
        }],
      }
    };
  }

}