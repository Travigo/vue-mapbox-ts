# Mapbox Popup

Documentation will follow

## Properties

Most of the properties will be exactly as defined by mapbox-gl in it's options. Here is a list of the properties for Popups

| Property     | Type                       | Interface   | Default Value |
| :----------- | :------------------------- | :---------- | :------------ |
| lngLat       | [number, number]           | LngLatInput | [0,0]         |
| closeButton  | boolean                    |             | false         |
| closeOnClick | boolean                    |             | true          |
| closeOnMove  | boolean                    |             | false         |
| anchor       | String                     | Anchor      | undefined     |
| offset       | number | [number, number ] | Offset      | undefined     |
| className    | string                     |             | undefined     |
| maxWidth     | string                     |             | 500px'        |
| renderless   | boolean                    |             | false         |

Also see [Mapbox Documentation](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)