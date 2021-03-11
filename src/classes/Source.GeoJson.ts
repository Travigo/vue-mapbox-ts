import { Point } from 'mapbox-gl';

export const getEmptyFeatureCollection = () => ({
  type: 'FeatureCollection',
  features: [],
});

export default class GeoJsonSource {
  type: 'FeatureCollection';
  features: Array<any>;

  constructor(){
    this.type = 'FeatureCollection';
    this.features = [];
  }
}

export interface PointFeatureInput {
  coordinates: [ number, number];
  properties?: Record<string,any>
}

export class PointFeature {
  type: 'Feature';
  properties: Record<string,any>;
  geometry: {
    type: 'Point',
    coordinates: [number, number];
  };

  constructor(input: PointFeatureInput){
    this.type = 'Feature';
    this.geometry = {
      type: 'Point',
      coordinates: input.coordinates,
    };
    this.properties = input.properties || {};
  }
}