import { ORef } from '../../classes/map';
import { Ref, UnwrapRef, watch, WatchCallback, WatchOptions, WatchStopHandle } from 'vue';

export default <T,U=T>(ref:ORef<T> | UnwrapRef<T> | T , cb: WatchCallback<T>, options?:WatchOptions):WatchStopHandle|null => {
  if(ref && (ref as any).value !== undefined)
    return watch(ref as any, cb as WatchCallback, options);  
  else
    return null;
    
};