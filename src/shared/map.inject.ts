import { inject } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';


export default {
  setup() {
    const vmb_map = inject('vmb_map') as Deferred<Map>;

    return { vmb_map };
  },
};