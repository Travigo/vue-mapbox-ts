/**
 * Capitalize the first letter of a string
 *
 * @param  {String} string The string to capitalize
 * @return {String}        The capitalized string
 */
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Automatically set a mapbox element's props when the vue element props changes
 *
 * @param  {Vue}    vueElement    The Vue component in question
 * @param  {Mixed}  mapboxElement The Mapbox element bound to the component
 * @param  {Object} props         The component's props definition object
 * @return {void}
 */

export const propNeedsBinding = (prop: any): boolean => {
  if(typeof prop !== 'object' || prop === null)
    return false;
  else {
    return 'bind' in prop;
  }
};

export const getSetMethodName = (propName: string) => {
  switch(propName){
    case 'mapStyle':
      return 'setStyle';
    default:
      return `set${capitalizeFirstLetter(propName)}`;
  }
};

export default function bindProps(vueElement: any, mapboxElement: any, props: any) {
  Object.keys(vueElement.$props)
    .filter((prop) => prop !== undefined)
    .forEach((prop) => {
      const setMethodName = getSetMethodName(prop);

      const methodExists = typeof mapboxElement[setMethodName] === 'function';
      const needsBinding = propNeedsBinding(props[prop]);

      // Do nothin if `setMethodName` is not a function of `mapBoxElement`
      // or if the props is not to be bounded
      if (!methodExists || !needsBinding) {
        return;
      }

      // Set deep option to true if prop type is or can be Object
      const { type } = props[prop];
      const options = {
        deep: type === Object || (Array.isArray(type) && type.includes(Object)),
      };

      vueElement.$watch(
        prop,
        (newValue: any) => {
          mapboxElement[setMethodName](newValue);
        },
        options
      );
    });
}
