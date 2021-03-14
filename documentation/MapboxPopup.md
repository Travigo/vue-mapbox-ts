# Mapbox Popup

Documentation will follow

## Properties

Most of the properties will be exactly as defined by mapbox-gl in it's options. Here is a list of the properties for Popups

| Property     | Type                      | Interface   | Default Value | Reactive |
| :----------- | :------------------------ | :---------- | :------------ | -------- |
| lngLat       | [number, number]          | LngLatInput | [0,0]         | x        |
| closeButton  | boolean                   |             | false         |          |
| closeOnClick | boolean                   |             | true          |          |
| closeOnMove  | boolean                   |             | false         |          |
| anchor       | String                    | Anchor      | undefined     |          |
| offset       | number; [number, number ] | Offset      | undefined     | x        |
| className    | string                    |             | undefined     |          |
| maxWidth     | string                    |             | 500px'        | x        |
| renderless   | boolean                   |             | false         |          |

## Events

| Event | Return Type |
| :---- | :---------- |
| close | Object      |
| open  | Object      |

Also see [Mapbox Documentation](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)

