# Mapbox Popup

Documentation will follow

## Properties

Most of the properties will be exactly as defined by mapbox-gl in it's options. Here is a list of the properties for Popups

| Property     | Type                      | Interface   | Default Value | Mandatory             | Reactive              |
| :----------- | :------------------------ | :---------- | :------------ | --------------------- | --------------------- |
| lngLat       | [number, number]          | LngLatInput | [0,0]         | &#x2612; | &#x2611; |
| closeButton  | boolean                   |             | false         | &#x2612; | &#x2612; |
| closeOnClick | boolean                   |             | true          | &#x2612; | &#x2612; |
| closeOnMove  | boolean                   |             | false         | &#x2612; | &#x2612; |
| anchor       | String                    | Anchor      | undefined     | &#x2612; | &#x2612; |
| offset       | number; [number, number ] | Offset      | undefined     | &#x2612; | &#x2611; |
| className    | string                    |             | undefined     | &#x2612; | &#x2612; |
| maxWidth     | string                    |             | 500px'        | &#x2612; | &#x2611; |
| renderless   | boolean                   |             | false         | &#x2612; | &#x2612; |

## Events

| Event | Return Type |
| :---- | :---------- |
| close | Object      |
| open  | Object      |

Also see [Mapbox Documentation](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)

