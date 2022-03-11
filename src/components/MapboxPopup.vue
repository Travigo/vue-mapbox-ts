<template>
  <div ref="content">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted, onUnmounted, PropType, Ref, ref, watch } from 'vue';
import mapboxgl, {  Marker, Anchor, Map, LngLatLike, Offset, } from 'mapbox-gl';
import { getPopupOptions, mountPopup, PopupEmits, registerPopupEvents, updatePopup } from '../services/MapboxPopup';
import Deferred from 'my-deferred/dist/src';
import { Circle } from '../classes/GeogeometryCircle';
import { Polygon } from '../classes/GeogeometryPolygon';
import { GeogeometryType } from '../classes/Geogeometry';
import { Rectangle } from '../classes/GeogeometryRectangle';
import { GeogeometryFill } from '../classes/Geogeometry.Paint.Fill';
import { GeogeometryLine } from '../classes/Geogeometry.Paint.Line';
import { GeogeometryPaintType } from '../classes/Geogeometry.Paint';

export default defineComponent({
  name: 'MapboxPopup',
  emits: PopupEmits,
  props: {
    lngLat: {
      type: [Object, Array] as PropType<LngLatLike>,
      default: (): LngLatLike => [0,0],
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
      type: String as PropType<Anchor>,
      default: undefined
    },
    offset: {
      type: [Number, Array] as PropType<Offset>,
      default: undefined
    },
    className: {
      type: String
    },
    focusAfterOpen: {
      type: Boolean,
      default: true
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
    const vmb_paint = inject('vmb_geogeometry_paint', null) as Deferred<GeogeometryPaintType> | null;

    const popupOptions = getPopupOptions(props);
    const vmb_popup = new mapboxgl.Popup(popupOptions)    
      .setLngLat(props.lngLat as any);

    onMounted(async () => {
      const instance = getCurrentInstance();
      if(vmb_map && instance){
        await mountPopup(instance, vmb_map, vmb_popup, vmb_marker, vmb_paint, content);
        registerPopupEvents(vmb_popup, instance);
      }
        
    });

    watch(props, props => {
      updatePopup(props, vmb_popup);
    });

    onUnmounted(async () => {
      vmb_popup.remove();
    });

    return { content };
  }
});
</script>
