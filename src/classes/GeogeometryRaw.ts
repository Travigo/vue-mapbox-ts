import { Geogeometry, GeogeometryInput } from './Geogeometry';
import { AnySourceData, FillPaint, GeoJSONSource, GeoJSONSourceRaw } from 'mapbox-gl';
import { getCenterForFeature, getCenterForFeatureCollection } from '../services/MapboxGeogeometryRaw';
import { Feature, FeatureCollection } from 'geojson';

export type RadiusType = 'absolute' | 'relative';

export interface RawInput extends GeogeometryInput{
  source: GeoJSONSourceRaw | Feature | FeatureCollection
}

export class Raw extends Geogeometry {
  source: GeoJSONSourceRaw | Feature | FeatureCollection;

  constructor(input: RawInput){
    super(input);
    this.source = input.source;
  }

  updateOptions(input:Partial<RawInput>){
    super.updateOptions(input);    
    if(input.source)
      this.source = input.source;
  }


  get center():[number,number]{
    const data = this.getGeoJSONData() as any;    
    if(!data || !data.type){
      console.warn('Geogeometry Raw: Could not get center. Coordinates could not be obtained');
      return [0,0];
    }
    if(data.type === 'Feature'){
      return getCenterForFeature(data).center;
    }
    if(data.type === 'FeatureCollection'){
      return getCenterForFeatureCollection(data).center;
    }

    throw new Error('Geogeometry Raw: Unknown Error getting Center');
  }

  getGeoJSON():GeoJSONSourceRaw{
    if(this.source.type === 'geojson')
      return this.source;
    else {
      return {
        type: 'geojson',
        data: this.source
      };
    }
  }

  getGeoJSONData():Feature | FeatureCollection {
    return (this.getGeoJSON() as any).data;
  }
}