# Vue Mapbox TS

This project has been created to bring a modern mapbox component library utilizing TypeScript and Vue3.

The Framework is highly reactive to ensure interacting with the components is possible in the way you are used to in vue.

Working with vue-mapbox-ts is easy even if you are not completely familiar with Mapboxs' 'mapbox-gl'-API.

To make use even easier additional components like Geogeometry have been added to add simple geometry like circles rectangles or polygons to your map without the need of a deep understanding of geoJSON

Current Minified size: ~35KB

## Installation

To install Vue Mapbox TS use npm
```sh
npm install -S vue-mapbox-ts
```

### Global installation
In your main.ts file install the plugin like this 

**Vue2**

This library is not compatible with Vue2. For this purpose I have released a clone of this Repo utilizing @vue/composition-api for Vue2 support. Just head over to [vue-mapbox-ts-legacy](https://www.npmjs.com/package/vue-mapbox-ts-legacy).
Please keep in mind that this repo will be the master and the legacy version will receive updates later.

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

## Current state of development
While the API is pretty stable by now please note that breaking changes might still occur on minor version updates (like 0.3.x -> 0.4.0) until the major version 1 is released.

If you want to contribute please feel free to post Merge Requests. Also report any issues you might find [here](https://gitlab.com/relief-melone/vue-mapbox-ts/-/issues)

## Use

### Creating a map
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

[Full API of mapbox-map](https://gitlab.com/relief-melone/vue-mapbox-ts/-/tree/master/documentation/MapboxMap.md)

### Adding a Marker
To add a marker to your existing map add it as a child to your map
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-marker :lngLat="[10,10]" />
</mapbox-map>
```

[Full API of mapbox-marker](https://gitlab.com/relief-melone/vue-mapbox-ts/-/tree/master/documentation/MapboxMarker.md)

### Adding a Popup
To add a popup just like a marker add it to a map as a child. You can also set it as the child of a marker. In that case it will ignore it's coordinates and attach itsself to that marker. Popups can be attached to

- Markers
- Geo-Geometries

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

[Full API of mapbox-popup](https://gitlab.com/relief-melone/vue-mapbox-ts/-/tree/master/documentation/MapboxPopup.md)


### Adding Controls

#### Navigation Control

Want to add Navigation Controls to your map? As always just insert the navigation-control component as a child to your map

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-navigation-control position="bottom-left" />
</mapbox-map>
```

[Full API of mapbox-navigation-control](./tree/master/documentation/MapboxNavigationControl.md)

#### Mapbox Geolocate Control
If you want to add information about the current users whereabouts instert the geolocate control as a child to your map

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geolocate-control />
</mapbox-map>
```
[Full API of mapbox-geolocate-control](https://gitlab.com/relief-melone/vue-mapbox-ts/-/tree/master/documentation/MapboxGeolocateControl.md)


#### Mapbox Geocoder Control
The Geocoder is used to find Places on your map. To add a Geocoder to your map just add the component as a child

**Geocoder Control integrated in Map**
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geocoder-control />    
</mapbox-map>
```

You can also use the Geocoder control as a standalone component in your app. providing a search find locations without a map. Please note that at this time the standalone component will not be able to communicate wit your map but I will add that feature later.

**Geocoder Control as standalone component**
```html
<mapbox-geocoder-control :accessToken="myAccessToken" @result="handleResult" />
```

[Full API of mapbox-geocoder-control](https://gitlab.com/relief-melone/vue-mapbox-ts/-/tree/master/documentation/MapboxGeocoderControl.md)

### Geogeometry

Geogemetry components allow you to easily add simple geometry to your map. Currently those are circle, rectangle and polygon and raw. You can also add popups to geogeometry. See the full API for more information


#### Circle

To add a circle to your map add the component to it. *center* and *radius* are mandatory. The rest is optionl. The radius is measured in km

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-circle
    :center="[3,8]"
    :radius="15"
  />
</mapbox-map>
```

[Full API of mapbox-geogeometry](https://gitlab.com/relief-melone/vue-mapbox-ts/-/tree/master/documentation/MapboxGeogeometry.md)