<template>
<div />
</template>

<script lang="ts">
import { mountGeogeometry, updateGeogeometry } from '../services/MapboxGeogeometry';
import { filterObject } from '../services/VueHelpers';
import { GeoJSONSource, Map } from 'mapbox-gl';
import Deferred from 'my-deferred/dist/src';
import { defineComponent, inject, onMounted, onUnmounted, provide, ref, watch } from 'vue';
import { Raw } from '../classes/GeogeometryRaw';
import { Feature, FeatureCollection } from 'geojson';

let rawDataAdded = 0;

export default defineComponent({
  name: 'MapboxGeogeometryRaw',
  props: {
    source: {
      type: Object as () => GeoJSONSource | FeatureCollection | Feature,
      required: true,
    },
    id: {
      type: String,
      default: `raw-${rawDataAdded++}`
    },
    fillColor: {
      type: String,
      default: 'red'
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
    const vmb_raw = new Raw(filterObject(props, [
      'source',
      'id',
      'fillColor',
      'outlineColor',
      'opacity',
      'antialias'
    ]));

    provide('vmb_raw', vmb_raw);

    onMounted(async () => {
      if(vmb_map){
        await mountGeogeometry(vmb_map, vmb_raw);
      }
      (window as any).$raw = vmb_raw;
    });

    watch(props, async () => {
      if(vmb_map){
        vmb_raw.updateOptions(props);
        await updateGeogeometry(props, vmb_map, vmb_raw);
      }        
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeLayer(vmb_raw.id);
      }
    });
  }
});
</script>
