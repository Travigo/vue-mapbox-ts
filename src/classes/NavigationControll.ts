import { NavigationControl } from 'mapbox-gl';

export interface NavigationControlOptions {
  showCompass: boolean;
  showZoom: boolean;
  vizualizePitch: boolean;
}

type NavigationControlPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export {
  NavigationControlPosition
};