import { NavigationControl, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { NavigationControlOptions, NavigationControlPosition } from '../classes/NavigationControll';

export const getNavigationControlOptions = (props:Partial<NavigationControlOptions>):Partial<NavigationControlOptions> => {
  const {
    showCompass,
    showZoom,
    vizualizePitch
  } = props;

  return {
    showCompass,
    showZoom,
    vizualizePitch
  };
};

export const mountNavigationControl = (  
  nav:NavigationControl,
  vmb_map: Deferred<Map>,
  position: NavigationControlPosition
) =>
  (async () => {
    const map = await vmb_map.promise;
    map.addControl(nav, position);
  })();