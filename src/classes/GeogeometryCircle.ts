import { Geogeometry, GeogeometryInput } from './Geogeomerty';
import { AnySourceData, FillPaint } from 'mapbox-gl';
import { distanceToLong, distanceToLat } from '../services/MapboxGeogeometry';

export type RadiusType = 'absolute' | 'relative';

export interface CircleInput extends GeogeometryInput{
  radius: number;
  center: [number, number];
  edges?: number;
}

export class Circle extends Geogeometry {
  radius: number;
  center: [number, number];
  edges: number;

  constructor(input: CircleInput){
    super(input);
    this.edges = input.edges || 10;
    this.radius = input.radius;
    this.center = input.center;
  }

  updateOptions(input:Partial<CircleInput>){
    super.updateOptions(input);
    
    if(input.edges)
      this.edges = input.edges;
    if(input.radius)
      this.radius = input.radius;
    if(input.center)
      this.center = input.center;
  }

  getGeoJSON():AnySourceData{
    const points = this.edges;
    const long = distanceToLong(this.radius, this.center[1]);
    const lat = distanceToLat(this.radius);

    const path = [];

    for(let i=0; i<points; i++){
      const theta = (i/points)*(2*Math.PI);
      const x = long*Math.cos(theta);
      const y = lat*Math.sin(theta);

      path.push([ this.center[0]+x, this.center[1]+y ]);
    }

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