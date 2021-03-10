// import { VueConstructor } from 'vue';
import * as components from './components';

/**
 * Install all components
 *
 * @param  {Vue}  Vue The Vue object
 * @return {void}
 */
export let _instance:any;

export default (instance: any) => {
  _instance = instance;
  Object.keys(components).forEach((name) => {
    instance.component(name, (components as any)[name]);
  });
};