export const slotIsNotEmpty = (el:HTMLElement):boolean =>
  el && el.outerHTML !== '<div></div>';


export const parentsNameIs = (instance:any, parentName: string) => {
  if(!instance.parent)
    return false;
  
  return instance.parent.type.name === parentName;
};

export const parentNameContains = (instance:any, parentNameFragment:string):boolean => {
  if(!instance.parent)
    return false;
  
  return (instance.parent.type.name as string).includes(parentNameFragment);
};