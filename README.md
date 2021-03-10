# Vue Mapbox TS

This project has been created to bring a modern vue component library utilizing TypeScript and Vue3.

The goal is that it is easy to use and to have the look and feel of a vue component.


## Installation

To install Vue Mapbox TS use npm
```sh
npm install -S vue-mapbox-ts
```

### Global installation
In your main.ts file install the plugin like this 

**Vue2**
```ts

import Vue from "vue";
import VueMapboxTs from "vue-mapbox-ts";

Vue.use(VueMapboxTs);
```

**Vue3**
```ts
import { createApp } from "vue";
import App from "./App";

import VueMapboxTs from "vue-mapbox-ts";

const app = createApp(App);

app.use(VueMapboxTs)
```

### A la Carte
You can also import the components needed in your module by just importing them and using them just as any other component

```ts
import { MapboxMap } from "vue-mapbox-ts";

export default defineComponent({
  // ...
  components: {
    MapboxMap
  }
})
```

## Current Beta State
This repository is still in it's early stages. So please keep in mind breaking changes might occur. It is not recommended for production use yet.

Also please keep in mind that this project still has limited functionality compared to mapbox-gl on which it builds up. Also not all features already implemented will also be documented here for now.

I will do my best to add functionality and update this documentation when I find the time.


## Use

### Creating a map
To add a map to your application it needs to be installed either locally or globally. If this is done, add a map like this

```html
<mapbox-map :accessToken="myAccessToken" />
```

[Full API of mapbox-map](./documentation/MapboxMap.md)

### Adding a Marker
To add a marker to your existing map add it as a child to your map
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-marker :lngLat="[10,10]" />
</mapbox-map>
```

[Full API of mapbox-marker](./documentation/MapboxMarker.md)

### Adding a Popup
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

[Full API of mapbox-popup](./documentation/MapboxPopup.md)


### Adding Controls

#### Navigation Control

Want to add Navigation Controls to your map? As always just insert the navigation-control component as a child to your map

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-navigation-control position="bottom-left" />
</mapbox-map>
```

[Full API of mapbox-navigation-control](./documentation/MapboxNavigationControl.md)

#### Mapbox Geolocate Control
If you want to add information about the current users whereabouts instert the geolocate control as a child to your map

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geolocate-control />
</mapbox-map>

```
[Full API of mapbox-geolocate-control](./documentation/MapboxGeolocateControl.md)

## Current State

This is still in early beta and I will do my best to update this Readme as soon as possible. But for now this example will have to do. Keep in mind that

- Mapbox-Map
- Mapbox-Marker
- Mapbox-Popup
- Mapbox-Navigation-Control
- Mapbox-Geolocate-Control

are the only components available for now.

In this example we want to create a map that has a marker on it and a popup that is attached to the marker. This would look like this

```pug
 mapbox-map(
  :access-token="accessKey"
)
  mapbox-marker(
    :lngLat="[15,10]"
    color="blue"
    :draggable="true"
  )
    mapbox-popup(
      :closeOnMove="true"
      :closeOnClick="true"
      className="juergen"
      :closeButton="true"
    )
      template
        v-img(:src="getUri(Property.TitleImage, 'preview', 'properties')")
```


[repository]: .