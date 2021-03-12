# Geogeometry

All Geogeometry components can be supplied with the following optional features. 

The unit for distances in Geogeometry Components is always km.

| Property     | Type    | Interface | Default Value | Mandatory |
| :----------- | :------ | :-------- | :------------ | :-------- |
| id           | string  |           | *generated*   |           |
| fillColor    | string  |           | "#3fb1cE"     |           |
| antialias    | boolean |           | true          |           |
| opacity      | number  |           | 0.6           |           |
| outlineColor | string  |           | undefined     |           |

You can attach Popups to all Geogeometry Components

#### id

if you want to specificly name your geogeomery you can add an id. By default every instance will get its unique id.

#### fillColor

Color your geometry will be filled with. By default it will be set to the same color as Mapboxs' default marker

#### antialias

enable or disable antialias to get a smoother display of your geometry or improve performance. Set to true by default

#### opacity

set the opacity for your geometry. Set to 0.6 by default

#### outline color

color for the outline of your geometry. Is set to undefined by default



## Circle

A circle will be added to your map.

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-circle
    :center="[3,8]"
    :radius="15"
  />
</mapbox-map>
```

### Properties

| Property | Type             | Interface | Default Value | Mandatory |
| :------- | :--------------- | :-------- | :------------ | :-------- |
| radius   | number           |           |               | *         |
| center   | [number, number] |           |               | *         |
| edges    | number           |           | 10            |           |

#### radius

The radius of the circle in km

#### center

Center of your circle

#### edges

As the circle will be drawn as a polygon you might want to increase the number of edges to make it "rounder" or decrease to improve performance


## Rectangle

Rectangles will be drawn with a specific height and width.

### Properties

| Property | Type             | Interface | Default Value | Mandatory |
| :------- | :--------------- | :-------- | :------------ | :-------- |
| center   | [number, number] |           |               | *         |
| height   | number           |           |               | *         |
| width    | number           |           |               | *         |


#### center

Center of your rectangle

#### height

Height of your rectangle in km

#### width

Width of your rectangle in km



## Polygon

If you need more flexibility you can also draw polygons. All you need is a path array

### Properties

| Property | Type               | Interface | Default Value | Mandatory |
| :------- | :----------------- | :-------- | :------------ | :-------- |
| path     | [number, number][] |           |               | *         |

#### path

Path of your polygon represented by an array of points. please note that if you want to have a closed Polygon you will need to include your first point as the last one also to make your polygon closed.