/**
 * Map a mapbox element's events to the given vue element
 *
 * @param  {Vue}    vueElement    The Vue component in question
 * @param  {Mixed}  mapboxElement The Mapbox element bound to the component
 * @param  {Array}  events        The events to map
 * @param  {String} layerId       The layer on which the events are delegated
 * @return {Array}                The list of event/handler pair bounded
 */
export declare function bindEvents(vueElement: any, mapboxElement: any, events?: any[], layerId?: any): void;
/**
 * Unbind events from the map element
 *
 * @param  {Mixed} mapboxElement The Mapbox element which needs unbinding
 * @param  {Array}  handlers     The list of event/handler pair to unbind
 * @param  {String} layerId      The layer on which the events where delegated
 * @return {void}
 */
export declare function unbindEvents(vueElement: any, mapboxElement: any, layerId?: any): void;
