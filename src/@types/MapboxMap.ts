
// Temporary because at the moment mapbox-gl did not update their type definitions from 2.7.3 -> 2.9.1
import Map from 'mapbox-gl';

declare module 'mapbox-gl' {
  type Projection = undefined | 'globe' | 'equalEarth' | 'albers' | 'mercator' | 'lambertConformalConic' | 'winkelTripel' | 'naturalEarth' | 'equirectangular';

  export interface ProjectionSpecification {
    name: Projection,
    center: [number, number]
    parallels: [number, number]
  }
  
  export interface Map {
    setProjection: (projection?: Projection | ProjectionSpecification) => void
  }

  
}