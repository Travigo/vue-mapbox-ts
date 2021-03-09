<template lang="pug">
div
  slot
</template>

<script lang="ts">
import { Component,defineComponent, onMounted, provide, Ref, ref, } from 'vue';
import mapboxgl, { Marker, MarkerOptions, PointLike, Anchor, Alignment } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import injectMap from '../shared/map.inject';

import LngLatInput from '../classes/LngLatInput';


const getMarkerOptions = (props: Partial<MarkerOptions>): MarkerOptions => {
  const { 
    element,
    offset,
    anchor,
    color,
    draggable,
    clickTolerance,
    rotation,
    rotationAlignment,
    pitchAlignment,
    scale
  } = props; 

  return {
    element,
    offset,
    anchor,
    color,
    draggable,
    clickTolerance,
    rotation,
    rotationAlignment,
    pitchAlignment,
    scale
  };
};

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

const registerMarkerEvents = (marker: mapboxgl.Marker, component: any) => {
  marker.on('drag', (evt: any) => {
    const { lng, lat } = evt.target._lngLat;
    (component as any)._lngLat = [lng, lat];
    component.$emit('drag', evt);
  });

  marker.on('dragend', (evt: any) => {
    component.$emit('dragend', evt);
  });

  marker.on('dragstart', (evt: any) => {
    component.$emit('dragstart', evt);
  });

  marker.getElement().addEventListener('click', _ev => {
    component.$emit('click', marker);
  });
};

export default defineComponent({
  props: {
    lngLat: {
    // type: Array as () => Array<number>,
      default: () => [0,0] as LngLatInput,
    // required: true,
    },
    element: {
      type: HTMLElement,
      default: null,
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

    provide('vmb_marker', vmb_marker);

    onMounted(() => {
      
    });

    return { vmb_map, vmb_marker, i_lngLat, i_popups };
  },

  watch: {
    $children(children){
      console.log('CHILDREN CHANGED');
      console.log(children);
    }
  },

  async mounted(){
    const map = await this.vmb_map.promise;
    const options = getMarkerOptions(this.$props);    
    
    const marker = new Marker(options)
      .setLngLat(this.lngLat as any);

    // addPopupToMapIfPresent(this, marker);    
    // registerMarkerEvents(marker, this);
    
    marker.addTo(map);
    this.vmb_marker.resolve(marker);
  }
});
</script>
