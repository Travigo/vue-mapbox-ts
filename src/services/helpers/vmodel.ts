import { getCurrentInstance, Ref, ref, UnwrapRef, watch } from 'vue';
import equal from 'fast-deep-equal';
import { isPrimitive } from './refForClasses';


export default function <T, U=Ref<T> | UnwrapRef<T>>(propertyValue:Record<string,any>, eventName:string|string[] = 'change', modelName='value'):U{
  const instance = getCurrentInstance();
  const eventNames = eventName instanceof Array
    ? eventName
    : [eventName];
  
  if(!instance)
    throw new Error('vmodel: Instance not found');
  
  const internal = ref<Record<string,any>>(instance.props[modelName] || propertyValue);

  for(const eventName of eventNames)
    watch(internal, _val => {
      instance.emit(eventName, internal.value);    
    });

  watch(instance.props, () => {
    if(isPrimitive(instance.props[modelName]) 
      ? instance.props[modelName] !== internal.value 
      : !equal(instance.props[modelName], internal.value)
    )
      internal.value = instance.props[modelName] as any;
      
  });

  return internal as any;
}