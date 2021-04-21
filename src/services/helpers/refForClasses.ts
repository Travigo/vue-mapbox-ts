import { Ref, ref } from 'vue';

export const isPrimitive = (input:any) => {
  const primitives = ['string', 'number', 'boolean'];
  let isPrimitive = false;

  if(input === null)
    isPrimitive = true;
  
  if(primitives.some(p => typeof input === p))
    isPrimitive = true;

  return isPrimitive;
  
};

export const refGetter = <T>(cl:Record<string,any>, varName: string):Ref<T> => {
  
  const pVar:T|Ref<T> = cl[varName];
  if(isPrimitive(pVar) || pVar instanceof Array)
    cl[varName] = ref(pVar);
  
  return cl[varName];
};

export const refSetter = <T>(value:T, cl:Record<string,any>, privateVar:string):void => {
  if(isPrimitive(value))
    cl[privateVar] = ref(cl[privateVar]);

  cl[privateVar].value = value;
};