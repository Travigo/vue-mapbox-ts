import { Map } from 'mapbox-gl';
import { getCurrentInstance, reactive, Ref, UnwrapRef, watch } from 'vue';

export function enableAutoResize(rootContainerRef:Ref<HTMLElement | null>, map:Map, autoResizeDelay?: number){
  if((window as any).ResizeObserver){
    enableAutoResizeWithResizeObserver(rootContainerRef, map);
  } else {
    const containerSize = enableAutoResizeWithEventListener(rootContainerRef, autoResizeDelay);
    watch(containerSize, () => {
      map.resize();
    });
  }
}

export function enableAutoResizeWithResizeObserver(rootContainerRef:Ref<HTMLElement | null>, map:Map){
  if(!rootContainerRef.value)
    throw new Error('Could not enable auto-resize because root container could not be found');

  const observer = new (window as any).ResizeObserver(() =>{ 
    console.log('resizing with resizeObserver');
    map.resize();
  });
  observer.observe(rootContainerRef.value);
}


export function enableAutoResizeWithEventListener(watchedRef:Ref<HTMLElement | null>, autoResizeDelay?: number):UnwrapRef<DOMRect> {
  const instance = getCurrentInstance();
  let result:UnwrapRef<DOMRect> = reactive(new DOMRect(0,0,0,0).toJSON());
  
  if(instance){
    let boundingBox:DOMRect = watchedRef.value
      ? watchedRef.value.getBoundingClientRect()
      : new DOMRect(0,0,0,0);
      
    
    addEventListener('resize', val => {
      setTimeout(() => {
        if(watchedRef.value){
          const newBoundingBox = watchedRef.value.getBoundingClientRect().toJSON();
          const boundingBoxHasChanged = boundingBox.width !== newBoundingBox.width || boundingBox.height !== newBoundingBox.height;
          boundingBox = newBoundingBox;
  
          if(boundingBoxHasChanged)
            Object.assign(result,newBoundingBox);
        }    
      }, autoResizeDelay || 0);
    });
  }

  return result;
}