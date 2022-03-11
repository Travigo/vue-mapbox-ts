# Mapbox Popup

To add a popup to your map just add one to your map like this


```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-popup :lngLat="[ 15,15 ]">
    <div> I am the content of this Popup</div>
  </mapbox-popup>
</mapbox-map>
```

You can also attach your popups to markers. To learn how to do this check the documentation of [Mapbox Markers](./MapboxMarker.md)

## Properties

Most of the properties will be exactly as defined by mapbox-gl in it's options. Here is a list of the properties for Popups

| Property       | Type                      | Interface   | Default Value | Mandatory | Reactive |
| :------------- | :------------------------ | :---------- | :------------ | --------- | -------- |
| anchor         | String                    | Anchor      | undefined     | &#x2612;  | &#x2612; |
| className      | string                    |             | undefined     | &#x2612;  | &#x2612; |
| closeButton    | boolean                   |             | false         | &#x2612;  | &#x2612; |
| closeOnClick   | boolean                   |             | true          | &#x2612;  | &#x2612; |
| closeOnMove    | boolean                   |             | false         | &#x2612;  | &#x2612; |
| focusAfterOpen | boolean                   |             | false         | &#x2612;  | &#x2612; |
| lngLat         | [number, number]          | LngLatInput | [0,0]         | &#x2612;  | &#x2611; |
| maxWidth       | string                    |             | '500px'       | &#x2612;  | &#x2611; |
| offset         | number; [number, number ] | Offset      | undefined     | &#x2612;  | &#x2611; |
| renderless     | boolean                   |             | false         | &#x2612;  | &#x2612; |

## Events

| Event | Return Type |
| :---- | :---------- |
| close | Object      |
| open  | Object      |

Also see [Mapbox Documentation](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup)

