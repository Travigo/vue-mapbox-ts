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

| Property     | Type   | Interface    | Default Value | Mandatory             | Reactive              |
| :----------- | :----- | :----------- | :------------ | --------------------- | --------------------- |
| height       | string |              | "500px"       | :white_medium_square: | :white_square_button: |
| width        | string |              | "100%"        | :white_medium_square: | :white_square_button: |
| flyToOptions | Object | FlyToOptions | {}            | :white_medium_square: | :white_square_button: |


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

#### update:center
Will be emitted on dragend and contains the new center of the map in the form of [number, number]

#### update:pitch
Will be emitted on pitchend and contains the updated pitch value as a number

#### update:zoom
Will be emitten on zoomend and contains the updated zoom value as a number