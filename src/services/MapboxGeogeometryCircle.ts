export const metersToPixelsAtMaxZoom = (meters:number, latitude:number):number =>
  meters / 0.075 / Math.cos(latitude * Math.PI / 180);