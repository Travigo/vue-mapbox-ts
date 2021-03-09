// import { VueConstructor } from 'vue';
import * as components from './components';

export let _Vue: any;
export let _CompositionApi: any;
/**
 * Install all components
 *
 * @param  {Vue}  Vue The Vue object
 * @return {void}
 */

export default (Vue: any) => {
  _Vue = Vue;

  Object.keys(components).forEach((name) => {
    Vue.component(name, (components as any)[name]);
  });
};