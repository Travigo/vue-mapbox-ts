<template>
<div ref="features">
  <slot name="default">
    <mapbox-geogeometry-fill 
      :color="fillColor" 
      :outlineColor="outlineColor" 
      :opacity="opacity"
      :antialias="antialias"
    >
      <slot name="popup" />
    </mapbox-geogeometry-fill>
  </slot>
</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, provide, watch, } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';

import { Rectangle } from '../classes/GeogeometryRectangle';
import { mountGeogeometry, updateGeogeometry } from '../services/MapboxGeogeometry';
import { filterObject } from '../services/VueHelpers';

let polygonsAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryRectangle',
  props: {
    id: {
      type: String,
      default: `rectangle-${polygonsAdded++}`
    },
    center: {
      type: Array as any as () => [number, number],
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    fillColor: {
      type: String,
    },
    outlineColor: {
      type: String,      
    },
    opacity: {
      type: Number,
      default: 0.6
    },
    antialias: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const vmb_rectangle = new Deferred<Rectangle>();
    const rectangle = new Rectangle(filterObject(props, [
      'id',
      'width',
      'height',
      'center',
      'fillColor',
      'outlineColor',
      'opacity',
      'antialias'
    ]));

    provide('vmb_rectangle', vmb_rectangle);

    onMounted(async () => {
      if(vmb_map){
        await mountGeogeometry(vmb_map, rectangle);
        vmb_rectangle.resolve(rectangle);
        rectangle.deferred.resolve(rectangle);
      }
        
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeLayer(rectangle.id);
      }      
    });

    watch(props, async () => {
      if(vmb_map){
        await updateGeogeometry(props, vmb_map, rectangle);
      }      
    });
  }
});
</script>
