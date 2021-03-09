import { inject } from 'vue';
import { Marker } from 'mapbox-gl';
import Deferred from 'my-deferred';


export default {
  setup() {
    const vmb_marker = inject('vmb_marker') as Deferred<Marker>;

    return { vmb_marker };
  },
};