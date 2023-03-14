import { Feature, FeatureCollection, Position } from 'geojson';
export declare const pathIsClosed: (pos: Position[]) => boolean;
export declare const inputIsPath: (potentialPath: Position[] | Position[][]) => boolean;
export declare const getCenterForCoordinates: (input: Position[] | Position[][], inputVisited?: number, inputCenter?: number[]) => {
    visited: number;
    center: [number, number];
};
export declare const getCenterForFeature: (feature: Feature, inputVisited?: number, inputCenter?: number[]) => {
    visited: number;
    center: [number, number];
};
export declare const getCenterForFeatureCollection: (featureCollection: FeatureCollection, inputVisited?: number, inputCenter?: number[]) => {
    visited: number;
    center: [number, number];
};
//# sourceMappingURL=MapboxGeogeometryRaw.d.ts.map