<template>
<div ref="content">
  <slot />
</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, inject, onMounted, Ref, ref, } from 'vue';
import { Map, Marker } from 'mapbox-gl';
import { getMapboxIconOptions, mountMapboxIcon } from '../services/MapboxIcon';
import Deferred from 'my-deferred';
import randomString from 'crypto-random-string';
import { Icon } from '../classes/Icon';


export default defineComponent({
  name: 'MapboxSourceGeoJson',
  props: {
    pixelRatio: {
      type: Number,
      default: 2
    },
    sdf: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: () => randomString(
        { length: 10, type: 'alphanumeric' }
      )
    }
  },
  setup(props) {
    const content = ref(null) as Ref<HTMLElement | null>;
    const vmb_map = inject('vmb_map', null) as Deferred<Map> | null;
    const vmb_marker = inject('vmb_marker', null) as Deferred<Marker> | null;
    const vmb_icon = new Deferred<Icon>();

    const options = getMapboxIconOptions(props);

    const icon:Icon = {
      name: props.name,
      icon: content,
      options
    };
    

    onMounted(async () => {
      const instance = getCurrentInstance();
      if(instance && vmb_map){
        await mountMapboxIcon(icon, vmb_map, vmb_marker, instance);
        vmb_icon.resolve(icon);
      }      
    });

    return {
      vmb_map,
      vmb_marker,
      vmb_icon,
      options
    };
  }
});
</script>