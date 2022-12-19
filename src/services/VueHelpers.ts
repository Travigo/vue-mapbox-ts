export type Primitive = number | string | boolean | bigint | symbol | null | undefined;
import { ComponentInternalInstance } from 'vue';
import { InstanceWithOn } from '../classes/VueMapbox';

export const slotIsNotEmpty = (el:HTMLElement):boolean =>
  el && el.outerHTML !== '<div></div>';


export const filterObject = <T extends Record<string,any>>(object:T, keys?:(keyof T)[], blacklist:Array<any> = [ undefined ]):T => {
  const result:T = {} as T;
  const _keys = keys || Object.keys(object) as (keyof T)[];
  

  for(const key of _keys){
    if(!blacklist.some(b => b === object[key] )){
      result[key] = object[key];
    }
  }

  return result;
};

export const parentsNameIs = (instance:any, parentName: string) => {
  if(!instance.parent)
    return false;
    
  // Vue 3
  if(instance.parent.type)
    return instance.parent.type.name === parentName;
    
  // Vue 2
  if(instance.parent.vnode.tag)
    return (instance.parent.vnode.tag as string).endsWith(parentName);
    
  return false;
};
  
export const parentNameContains = (instance:any, parentNameFragment:string):boolean => {
  if(!instance.parent)
    return false;
    
  // Vue 3
  if(instance.parent.type)
    return (instance.parent.type.name as string).includes(parentNameFragment);
    
  // Vue 2
  if(instance.parent.vnode.tag)
    return (instance.parent.vnode.tag as string).includes(parentNameFragment);
  
  return false;
};
export const duplicateEvents = <
  T extends InstanceWithOn<any>, 
>(object:T, instance: ComponentInternalInstance, events:Array<string>) => {
  for(const event of events)
    object.on(event, (evt) => {
      instance.emit(event, evt);
    });
};