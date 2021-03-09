import mapboxgl, { MapboxOptions, Map } from 'mapbox-gl';
import Deferred from 'my-deferred';
import { Ref } from 'vue';

const getMapboxOptions = (props: any, el: any): MapboxOptions => ({
  accessToken: props.accessToken,
  container: props.container || el,
  style: props.mapStyle
});

export default (props:Record<string,any>, vmb_map:Deferred<Map>, rootRef: Ref<any>) =>
  (() => {
    const element = rootRef.value;
    const mapOptions = getMapboxOptions(props, element);
    const map = new mapboxgl.Map(mapOptions);

    map.on('load', () => {
      vmb_map.resolve(map);
    });

  })();