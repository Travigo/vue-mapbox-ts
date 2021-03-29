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

import { Circle } from '../classes/GeogeometryCircle';
import { mountGeogeometry, updateGeogeometry } from '../services/MapboxGeogeometry';
import { filterObject } from '../services/VueHelpers';

let circlesAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryCircle',
  props: {
    id: {
      type: String,
      default: 'circle'
    },
    center: {
      type: Array as any as () => [number, number],
      required: true
    },
    radius: {
      type: Number,
      required: true
    },
    edges: {
      type: Number,
      default: 10
    },
    fillColor: {
      type: String,
    },
    outlineColor: {
      type: String,      
    },
    opacity: {
      type: Number
    },
    antialias: {
      type: Boolean
    }
  },
  setup(props) {

    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const vmb_circle = new Deferred<Circle>();
    const id = `${props.id}-${circlesAdded++}`;

    const circle = new Circle(filterObject({ ...props, id }, [
      'id',
      'radius',
      'center',
      'edges',
      'fillColor',
      'outlineColor',
      'opacity',
      'antialias'
    ]));

    provide('vmb_circle', vmb_circle);

    onMounted(async () => {
      if(vmb_map){
        await mountGeogeometry(vmb_map, circle);
        vmb_circle.resolve(circle);
        circle.deferred.resolve(circle);
      }
      
    });

    
    watch(props, async () => {
      if(vmb_map){
        await updateGeogeometry(props, vmb_map, circle);
      }      
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeLayer(circle.id); 
      }
    });
  }
});
</script>
