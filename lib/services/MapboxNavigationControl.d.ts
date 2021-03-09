import { NavigationControl, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { NavigationControlOptions, NavigationControlPosition } from '../classes/NavigationControll';
export declare const getNavigationControlOptions: (props: Partial<NavigationControlOptions>) => Partial<NavigationControlOptions>;
export declare const mountNavigationControl: (nav: NavigationControl, vmb_map: Deferred<Map>, position: NavigationControlPosition) => Promise<void>;
