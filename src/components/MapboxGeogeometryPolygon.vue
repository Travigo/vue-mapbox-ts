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
import { defineComponent, inject, onMounted, onUnmounted, provide, watch } from 'vue';
import { Map } from 'mapbox-gl';
import Deferred from 'my-deferred';

import { Polygon } from '../classes/GeogeometryPolygon';
import { mountGeogeometry, updateGeogeometry } from '../services/MapboxGeogeometry';
import { filterObject } from '../services/VueHelpers';

let polygonsAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryPolygon',
  props: {
    id: {
      type: String,
      default: 'polygon'
    },
    path: {
      type: Array as any as () => Array<[number, number]>,
      required: true
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
    const vmb_polygon = new Deferred<Polygon>();
    const id = `${props.id}-${polygonsAdded++}`;

    const polygon = new Polygon(filterObject({ ...props, id }, [
      'id',
      'path',
      'fillColor',
      'outlineColor',
      'opacity',
      'antialias'
    ]));

    provide('vmb_polygon', vmb_polygon);

    onMounted(async () => {
      if(vmb_map){
        await mountGeogeometry(vmb_map, polygon);
        vmb_polygon.resolve(polygon);
        polygon.deferred.resolve(polygon);
      }      
    });

    watch(props, async () => {
      if(vmb_map){
        polygon.updateOptions(props);
        await updateGeogeometry(props, vmb_map, polygon);
      }      
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeLayer(polygon.id);
      }      
    });
  }
});
</script>
