import deepEqual from 'deep-equal';
import { getCurrentInstance, reactive, Ref, ref, UnwrapRef } from 'vue';

export default (watchedRef:Ref<HTMLElement | null>):UnwrapRef<DOMRect> => {
  const instance = getCurrentInstance();
  let result:UnwrapRef<DOMRect> = reactive(new DOMRect(0,0,0,0).toJSON());
  
  if(instance){
    let boundingBox:DOMRect = watchedRef.value
      ? watchedRef.value.getBoundingClientRect()
      : new DOMRect(0,0,0,0);
    
    addEventListener('resize', val => {
      if(watchedRef.value){
        const newBoundingBox = watchedRef.value.getBoundingClientRect().toJSON();
        const boundingBoxHasChanged = boundingBox.width !== newBoundingBox.width || boundingBox.height !== newBoundingBox.height;
        boundingBox = newBoundingBox;

        if(boundingBoxHasChanged)
          Object.assign(result,newBoundingBox);
        
      }
           
    });
  }

  return result;
};