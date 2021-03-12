export const slotIsNotEmpty = (el:HTMLElement):boolean =>
  el && el.outerHTML !== '<div></div>';


export const parentsNameIs = (instance:any, parentName: string) => {
  if(!instance.parent)
    return false;
    
  // Vue 3
  if(instance.parent.type)
    return instance.parent.type.name === parentName;
    
  // Vue 2
  if(instance.parent.vnode.tag)
    return (instance.parent.vnode.tag as string).endsWith(parentName);
    
  throw ('VueHelper.parentNameIs: Unknown Error');
};
  
export const parentNameContains = (instance:any, parentNameFragment:string):boolean => {
  if(!instance.parent)
    return false;
    
  // Vue 3
  if(instance.parent.type)
    (instance.parent.type.name as string).includes(parentNameFragment);
    
  // Vue 2
  if(instance.parent.vnode.tag)
    return (instance.parent.vnode.tag as string).includes(parentNameFragment);
  
  throw ('VueHelper.parentNameContains: Unknown Error');
};