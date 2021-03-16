<template>
  <div ref="content">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import mapboxgl, {  Marker, Anchor, Map } from 'mapbox-gl';
import { getPopupOptions, mountPopup, PopupEmits, registerPopupEvents, updatePopup } from '../services/MapboxPopup';
import Deferred from 'my-deferred/dist/src';
import LngLatInput from '../classes/LngLatInput';
import { Circle } from '../classes/GeogeometryCircle';
import { Polygon } from '../classes/GeogeometryPolygon';
import { GeogeometryType } from '../classes/Geogeometry';
import { Rectangle } from '../classes/GeogeometryRectangle';

export default defineComponent({
  name: 'MapboxPopup',
  emits: PopupEmits,
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

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const vmb_marker: Deferred<Marker> | null = inject('vmb_marker', null);
    
    const vmb_circle: Circle | null = inject('vmb_circle', null);
    const vmb_polygon: Polygon | null = inject('vmb_polygon', null);
    const vmb_rectangle: Rectangle | null = inject('vmb_rectangle', null);

    const vmb_geometry:GeogeometryType | null = vmb_circle || vmb_polygon || vmb_rectangle || null;

    const popupOptions = getPopupOptions(props);
    const vmb_popup = new mapboxgl.Popup(popupOptions)    
      .setLngLat(props.lngLat as any);

    onMounted(async () => {
      const instance = getCurrentInstance();
      if(vmb_map && instance){
        await mountPopup(instance, vmb_map, vmb_popup, vmb_marker, vmb_geometry, content);
        registerPopupEvents(vmb_popup, instance);
      }
        
    });

    watch(props, props => {
      updatePopup(props, vmb_popup);
    });

    onUnmounted(async () => {
      vmb_popup.remove();
    });

    return { vmb_marker, vmb_popup, popupOptions, content, vmb_map };
  }
});
</script>
