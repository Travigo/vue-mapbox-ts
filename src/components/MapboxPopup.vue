<template lang="pug">
div
  div(ref="content")
    slot
      div Whaddup Bitches
    
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted, Ref, ref } from 'vue';
import mapboxgl, {  Marker, Anchor, Map } from 'mapbox-gl';
import { getPopupOptions, mountPopup } from '../services/MapboxPopup';
import Deferred from 'my-deferred/dist/src';
import LngLatInput from '../classes/LngLatInput';

export default defineComponent({
  props: {
    lngLat: {
      default: () => [0,0] as LngLatInput,
    },
    closeButton: {
      type: Boolean,
      default: false
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnMove: {
      type: Boolean,
      default: false
    },
    anchor: {
      type: String as () => Anchor,
      default: undefined
    },
    offset: {
      type: Number as () => mapboxgl.Offset,
      default: undefined
    },
    className: {
      type: String
    },
    maxWidth: {
      type: String,
      default: '500px'
    },
    renderless: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const content = ref(null) as Ref<any>;
    const defaultContent = ref(null) as Ref<any>;

    const vmb_marker: Deferred<Marker> | null = inject('vmb_marker') as Deferred<Marker> | null;
    const vmb_map:Deferred<Map> = inject('vmb_map') as Deferred<Map>;

    const popupOptions = getPopupOptions(props);
    const vmb_popup = new mapboxgl.Popup(popupOptions)    
      .setLngLat(props.lngLat as any);

    onMounted(async () => {
      const instance = getCurrentInstance();
      await mountPopup(instance, vmb_popup, vmb_marker, vmb_map, content);  
    });

    return { vmb_marker, vmb_popup, popupOptions, content, defaultContent, vmb_map };
  }
});
</script>
