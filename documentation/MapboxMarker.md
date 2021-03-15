# Mapbox Marker

## Adding a basic Marker

To add a marker to your existing map add it as a child to your map
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-marker :lngLat="[10,10]" />
</mapbox-map>
```

## Adding A Popup to your marker
To add a popup just like a marker add it to a map as a child. You can also set it as the child of a marker. In that case it will ignore it's coordinates and attach itsself to that marker.

**Standalone Popup**
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-popup :lngLat="[ 15,15 ]">
    <div> I am the content of this Popup</div>
  </mapbox-popup>
</mapbox-map>
```

**Popup attached to Marker**
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-marker :lngLat="[ 15,15 ]" :draggable="true">
    <mapbox-popup>
      <div> I am the content of an attached Popup</div>
    </mapbox-popup>
  </mapbox-marker>
</mapbox-map>
```

## Using a custom marker
You can also replace mapboxs' default maker by your own. Just put it in the icon slot.
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-marker :lngLat="[ 15,15 ]" :draggable="true">
    <template v-slot:icon>
      <img src="https://my-images/cool-image.jpg">
    </template>
  </mapbox-marker>
</mapbox-map>
```

## Properties

The properties will match mapbox documentations properties as much as possible. Here are the current properties for Markers

| Property          | Type                      | Interface   | Default Value | Reactive |
| :---------------- | :------------------------ | :---------- | :------------ | -------- |
| lngLat            | [number, number]          | LngLatInput | [0,0]         | x        |
| offset            | number; [number, number ] | Offset      | undefined     | x        |
| anchor            | string                    | Anchor      | "left"        |          |
| color             | string                    |             | null          | *        |
| scale             | number                    |             | 1             |          |
| draggable         | boolean                   |             | false         | x        |
| rotation          | number                    |             | 0             | x        |
| pitchAlignment    | string                    | Alignment   | "auto"        | x        |
| rotationAlignment | string                    | Alignment   | "auto"        | x        |


## Events

| Event         | Return Type      |
| :------------ | :--------------- |
| drag          | Object           |
| dragstart     | Object           |
| dragend       | Object           |
| click         | Object           |
| update:lngLat | [number, number] |

#### drag
Event from mapbox-gl-gs. Triggered while dragging Marker

#### dragstart
Event from mapbox-gl-gs. Triggered when starting to drag marker

#### dragend
Event from mapbox-gl-gs. Triggered when drag of marker ends

#### update:lngLat
Event triggeredd when drag ends. Used to enable two way data binding to your lngLat property.

Also see Mapboxs' [Documentation for Markers](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker)