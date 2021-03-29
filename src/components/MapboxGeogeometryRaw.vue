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
      default: 'raw'
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
    const vmb_raw = new Deferred<Raw>();
    const id = `${props.id}-${rawDataAdded++}`;

    const raw = new Raw(filterObject({ ...props, id }, [
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
        await mountGeogeometry(vmb_map, raw);
        vmb_raw.resolve(raw);
        raw.deferred.resolve(raw);
      }
      
    });

    watch(props, async () => {
      if(vmb_map){
        raw.updateOptions(props);
        await updateGeogeometry(props, vmb_map, raw);
      }        
    });

    onUnmounted(async () => {
      if(vmb_map){
        const map = await vmb_map.promise;
        map.removeLayer(raw.id);
      }
    });
  }
});
</script>
