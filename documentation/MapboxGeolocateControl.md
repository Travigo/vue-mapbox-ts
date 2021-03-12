# Mapbox Geolocate Control

the Geolocate Control will add the option to show your users current position

Add it to the map like this

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geolocate-control />
</mapbox-map>
```

## Options

| Property           | Type    | Interface        | Default Value             | Mandatory |
| :----------------- | :------ | :--------------- | :------------------------ | :-------- |
| positionOptions    | Object  | PositionsOptions | [here](#position-options) |           |
| fitBoundsOptions   | Object  | FitBoundsOptions | [here](#fitboundsoptions) |           |
| trackUserLocation  | boolean |                  | false                     |           |
| showAccuracyCircle | boolean |                  | true                      |           |
| showUserLocation   | boolean |                  | true                      |           |

#### positionOptions

*default value*
```js
{ enableHighAccuracy: false, timeout: 6000 }
```
See Mapbox Documentation [here](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol))

#### fitBoundsOptions

*default value*
```js
{ maxZoom: 15 }
```

See Mapbox Documenation [here](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol)