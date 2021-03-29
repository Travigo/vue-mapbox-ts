import { distanceToLat, distanceToLong } from '../services/MapboxGeogeometry';
import { AnySourceData, GeoJSONSourceRaw } from 'mapbox-gl';
import { Geogeometry, GeogeometryInput } from './Geogeometry';
import { rotateRectangle } from '../services/MapboxGeogeometryRectangle';

export interface RectangleInput extends GeogeometryInput {
  width: number;
  height: number;
  center: [number, number];
  rotationDeg?: number;
}

export class Rectangle extends Geogeometry {
  width: number;
  height: number;
  center: [number, number];
  rotationDeg: number;

  constructor(input:RectangleInput){
    super(input);
    this.width = input.width;
    this.height = input.height;
    this.center = input.center;
    this.rotationDeg = input.rotationDeg || 0;
  }

  updateOptions(input:Partial<RectangleInput>){
    super.updateOptions(input);
    if(input.width)
      this.width = input.width;
    if(input.height)
      this.height = input.height;
    if(typeof input.rotationDeg === 'number' && input.rotationDeg !== this.rotationDeg)
      this.rotationDeg = input.rotationDeg;
  }

  get coordinates():[number,number][]{
    const xy = rotateRectangle([
      [this.width/2, this.height/2 ],
      [- this.width/2, this.height/2 ],
      [- this.width/2, - this.height/2 ],
      [ this.width/2, - this.height/2 ]
    ], this.rotationDeg);

    const coords:[number,number][] = [
      [this.center[0] + distanceToLong(xy[0][0], this.center[1]), this.center[1] + distanceToLat(xy[0][1])],
      [this.center[0] + distanceToLong(xy[1][0], this.center[1]), this.center[1] + distanceToLat(xy[1][1])],
      [this.center[0] + distanceToLong(xy[2][0], this.center[1]), this.center[1] + distanceToLat(xy[2][1])],
      [this.center[0] + distanceToLong(xy[3][0], this.center[1]), this.center[1] + distanceToLat(xy[3][1])],
    ];

    return coords;
  }

  getGeoJSON():GeoJSONSourceRaw{
    const path = [
      ...this.coordinates,
      this.coordinates[0]
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