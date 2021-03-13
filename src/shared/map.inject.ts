import { inject } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';


export default {
  setup() {
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;

    return { vmb_map };
  },
};