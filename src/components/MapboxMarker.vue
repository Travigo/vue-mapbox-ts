<template>
<div>
  <div ref="icon">
    <slot name="icon" />
  </div>
  <slot />
</div>
</template>

<script lang="ts">
import { Component,defineComponent, getCurrentInstance, onMounted, onUnmounted, provide, Ref, ref, } from 'vue';
import mapboxgl, { Marker, PointLike, Anchor, Alignment } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import injectMap from '../shared/map.inject';

import LngLatInput from '../classes/LngLatInput';
import { mountMarker, getMarkerOptions } from '../services/MapboxMarker';


const getPopupChildren = (marker: any): Component | null => {  
  for (const child of marker.$slots.default()){
    if(child.type.__file.includes('MapboxPopup'))
      return (child);
  }
  return null;
};

const addPopupToMapIfPresent = (markerComponent: any, marker: mapboxgl.Marker) => {
  const popup: any = getPopupChildren(markerComponent);  
  if(popup){
    const mbPopup: mapboxgl.Popup = popup.$popup;

    marker
      .setPopup(mbPopup);
  }
};

export default defineComponent({
  name: 'MapboxMarker',
  props: {
    lngLat: {
    // type: Array as () => Array<number>,
      default: () => [0,0] as LngLatInput,
    // required: true,
    },
    offset: {
      type: [Array] as any as () => PointLike,
      default: () => [0,0] as [number, number],
    },
    anchor: {
      type: String as () => Anchor,
      default: () => 'left',
    },
    color: {
      type: String,
      default: null,
    },
    scale: {
      type: Number,
      default: 1,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    rotation: {
      type: Number,
      default: 0,
    },
    pitchAlignment: {
      type: String as () => Alignment,
      default: 'auto',
    },
    rotationAlignment: {
      type: String as () => Alignment,
      default: 'auto',
    },
  },
  setup(props) {
    const { vmb_map } = injectMap.setup();
    const vmb_marker = new Deferred<Marker>();
    const i_lngLat = ref(props.lngLat);
    const i_popups: Ref<Component | null> = ref(null);

    const icon = ref(null) as Ref<any | null>;

    const options = getMarkerOptions(props);
    provide('vmb_marker', vmb_marker);

    onMounted(async () => {
      const instance = getCurrentInstance();
      if(instance && vmb_map)
        await mountMarker(options, vmb_map, vmb_marker, instance, i_lngLat.value, icon);
    });

    onUnmounted( async () => {
      const marker = await vmb_marker.promise;
      marker.remove();
    });

    return { vmb_map, vmb_marker, i_lngLat, i_popups, options, icon };
  },

  watch: {
    $children(children){
      console.log('CHILDREN CHANGED');
      console.log(children);
    }
  },
});
</script>
