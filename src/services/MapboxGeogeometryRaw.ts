import Deferred from 'my-deferred/dist/src';
import { Feature, FeatureCollection, Position } from 'geojson';

export const pathIsClosed = (pos:Position[]) => {
  if(pos.length <= 1)
    return false;
  else{
    return pos[0][0] === pos[pos.length-1][0] && pos[0][1] === pos[pos.length-1][1];
  }
};

export const inputIsPath = (potentialPath:Position[] | Position [][]) => {
  if(potentialPath.length === 0)
    return true;
  if(potentialPath[0].length === 2 && typeof potentialPath[0][0] === 'number' && typeof potentialPath[0][1] === 'number')
    return true;
  
  return false;
};

export const getCenterForCoordinates = (input:Position[] | Position[][], inputVisited = 0, inputCenter = [0,0]) => {
  let visited = inputVisited;
  const center:[number, number] = [inputCenter[0], inputCenter[1]];

  if(inputIsPath(input)){
    if(pathIsClosed(input as Position[]))
      input.pop();
    for(const pos of input as Position[]){
      center[0] = (pos[0] + center[0]*visited)/(visited + 1);
      center[1] = (pos[1] + center[1]*visited)/(visited + 1);
      visited++;
    }
  } else {
    for(const pos of input as Position[][]){
      const { visited: visitedLocal, center: centerLoacl } = getCenterForCoordinates(pos);
      center[0] = (center[0]*visited + centerLoacl[0]*visitedLocal) / (visitedLocal + visited);
      center[1] = (center[1]*visited + centerLoacl[1]*visitedLocal) / (visitedLocal + visited);
      visited += visitedLocal;
    }
  }

  return {
    visited,
    center
  };
};

export const getCenterForFeature = (feature:Feature, inputVisited = 0, inputCenter = [0,0]) => {
  let visited = inputVisited;
  const center:[number, number] = [inputCenter[0], inputCenter[1]];

  switch(feature.geometry.type){
    case 'Polygon':
    case 'LineString': {
      const { center: centerLocal, visited: visitedLocal } = getCenterForCoordinates(feature.geometry.coordinates);
      center[0] = (center[0]*visited + centerLocal[0]*visitedLocal) / (visitedLocal + visited);
      center[1] = (center[1]*visited + centerLocal[1]*visitedLocal) / (visitedLocal + visited);
      visited += visitedLocal;
      break;
    }
  }

  return { visited, center };
};

export const getCenterForFeatureCollection = (featureCollection:FeatureCollection, inputVisited = 0, inputCenter = [0,0]) => {
  let visited = inputVisited;
  const center:[number, number] = [inputCenter[0], inputCenter[1]];

  for(let feature of featureCollection.features){
    const { center: centerLocal, visited: visitedLocal } = getCenterForFeature(feature);
    center[0] = (center[0]*visited + centerLocal[0]*visitedLocal) / (visitedLocal + visited);
    center[1] = (center[1]*visited + centerLocal[1]*visitedLocal) / (visitedLocal + visited);
    visited += visitedLocal;
    break;
  }

  return { visited, center };
};