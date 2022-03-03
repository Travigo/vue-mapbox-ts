# Mapbox Map

To add a map to your application it needs to be installed either locally or globally. If this is done, add a map like this

```html
<mapbox-map :accessToken="myAccessToken" />
```

To add a different map Style do

```html
<mapbox-map 
  :accessToken="myAccessToken"
  mapStyle="light-v10"
/>
```
You may notice that for map style you won't need the complete syntax. In this case Vue Mapbox TS will automatically interpret this style as mapbox://styles/mapbox/light-v10. However you can of course use the complete syntax as well

## Properties

All parameters from mapbox-gl can also be used to configure your map with the exception of container (which is set to this component). Please see their [documentation](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters)

Please note that the parameter style cannot be used as it is already reserved by Vue to configure css styling. to use a different style for your map use the property *mapStyle* In addition to the mapbox-gl parameters properties are

| Property            | Type    | Interface    | Default Value | Mandatory | Reactive |
| :------------------ | :------ | :----------- | :------------ | --------- | -------- |
| height              | string  |              | "500px"       | &#x2612;  | &#x2611; |
| width               | string  |              | "100%"        | &#x2612;  | &#x2611; |
| flyToOptions        | Object  | FlyToOptions | {}            | &#x2612;  | &#x2611; |
| auto-resize         | boolean |              | false         | &#x2612;  | &#x2612; |
| auto-resize-delay   | number  |              | undefined     | &#x2612;  | &#x2612; |
| cooperativeGestures | boolean |              | false         | &#x2612;  | &#x2612;         |


#### height
Height your map should have. Defaults to "500px"

#### width
The width your map should have. Defaults to "100%"

#### flyToOptions

Fly to options apply if your properties for center or zoom change. While center or zoom are controlled via their respective properties the rest of the fly to Options can be set in this object. By default it will use the defaults set in the [documentation of mapboxgls fly-to-options](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto)

An example to implement would be
```html
<mapbox-map 
  :accessToken="myAccessToken"
  mapStyle="light-v10"
  :flyToOptions="{ maxDuration: 2000, speed: 1.2 }"
/>
```

#### auto-resize

Auto Resize will enable the map to resize when it's container has been changed. This will not only be triggered if you actively change the width or height properties but also if you have set a relative width and the parent containers dimensions change. This feature utilizes the [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) as well as a listener on the resize event if an older browser is used that does not support the ResizeObserver yet

#### auto-resize-delay

If you are using transitons with your map container you might want to use a delay for the resize of the map to make sure the transition has been finished before resizing the map. This property is beeing ignored on newer browsers where a Resize Observer is present

### Currently Reactive
- center
- bearing
- maxBounds
- maxPitch
- maxZoom
- minPitch
- pitch
- renderWorldCopies
- zoom

## Events

All Events from mapbox-gl are also emitted by mapbox-map. See their [documentation](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events) on events.

Additionally events are emitted to enable updating your properties


#### loaded
Loaded will be emitted after the map is mounted and returns the mapbox map object itsself. Can be used to further manipulate the map directly

#### update:center
Will be emitted on dragend and contains the new center of the map in the form of [number, number]

#### update:pitch
Will be emitted on pitchend and contains the updated pitch value as a number

#### update:zoom
Will be emitten on zoomend and contains the updated zoom value as a number