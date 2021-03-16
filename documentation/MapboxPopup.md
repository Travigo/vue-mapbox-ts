# Mapbox Popup

Documentation will follow

## Properties

Most of the properties will be exactly as defined by mapbox-gl in it's options. Here is a list of the properties for Popups

| Property     | Type                      | Interface   | Default Value | Mandatory             | Reactive              |
| :----------- | :------------------------ | :---------- | :------------ | --------------------- | --------------------- |
| lngLat       | [number, number]          | LngLatInput | [0,0]         | :white_medium_square: | :white_square_button: |
| closeButton  | boolean                   |             | false         | :white_medium_square: | :white_medium_square: |
| closeOnClick | boolean                   |             | true          | :white_medium_square: | :white_medium_square: |
| closeOnMove  | boolean                   |             | false         | :white_medium_square: | :white_medium_square: |
| anchor       | String                    | Anchor      | undefined     | :white_medium_square: | :white_medium_square: |
| offset       | number; [number, number ] | Offset      | undefined     | :white_medium_square: | :white_square_button: |
| className    | string                    |             | undefined     | :white_medium_square: | :white_medium_square: |
| maxWidth     | string                    |             | 500px'        | :white_medium_square: | :white_square_button: |
| renderless   | boolean                   |             | false         | :white_medium_square: | :white_medium_square: |

## Events

| Event | Return Type |
| :---- | :---------- |
| close | Object      |
| open  | Object      |

Also see [Mapbox Documentation](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)

