import { Map } from 'mapbox-gl';
import MapboxDraw, { DrawEvent } from '@mapbox/mapbox-gl-draw';
import Deferred from 'my-deferred/dist/src';
import { DrawControlOptions } from '../classes/DrawControl';
import { filterObject } from './VueHelpers';
import { ComponentInternalInstance } from 'vue';

export const getDrawControlOptions = (props:DrawControlOptions):DrawControlOptions => 
  filterObject(props, ['position']);

export const mapDrawEvents = (vmb_map: Map, component: ComponentInternalInstance) => {
  vmb_map.on('draw.create', (e:DrawEvent) => {
    component.emit('create', e);
  });

  vmb_map.on('draw.update', (e:DrawEvent) => {
    component.emit('update', e);
  });

  vmb_map.on('draw.delete', (e:DrawEvent) => {
    component.emit('delete', e);
  });

  vmb_map.on('draw.selectionchange', (e:DrawEvent) => {
    component.emit('selectionChange', e);
  });

};

export const mountDrawControl = async (
  vmb_map: Deferred<Map>,
  vmb_drawControl: MapboxDraw,
  opts: DrawControlOptions,
  component: ComponentInternalInstance
) => {

  component.emit('loaded', vmb_drawControl);

  const map = await vmb_map.promise;
  mapDrawEvents(map, component);
  map.addControl(vmb_drawControl, opts.position);
};
