
export const rotateRectangle = (coords: [number, number][], angleDeg:number):[number,number][] => {
  if(coords.length !== 4)
    throw 'MapboxGeogeometryRectangle.rotateRectagle: Not a rectangle. Please supply exactly four coordinates';

  const angleRad = angleDeg*Math.PI/180;

  const rotatedCoords:[number,number][] = [];

  for(let i=0; i<coords.length; i++){
    rotatedCoords.push([
      coords[i][0]*Math.cos(angleRad) - coords[i][1]*Math.sin(angleRad),
      coords[i][0]*Math.sin(angleRad) + coords[i][1]*Math.cos(angleRad)
    ]);
  }

  return rotatedCoords;
};