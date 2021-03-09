# Vue Mapbox TS

Inspired by [vue-mapbox-gl](https://github.com/studiometa/vue-mapbox-gl) but since the program seems to be abanoned this project has been created to bring a modern vue component library utilizing TypeScript and Vue3.

The goal is that it is easy to use and to have the look and feel of a vue component.

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