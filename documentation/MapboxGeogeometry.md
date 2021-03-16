# Geogeometry

All Geogeometry components can be supplied with the following optional features. 

The unit for distances in Geogeometry Components is always km.

| Property     | Type    | Interface | Default Value | Mandatory             | Reactive              |
| :----------- | :------ | :-------- | :------------ | --------------------- | :-------------------- |
| id           | string  |           | *generated*   | :white_medium_square: |                       |
| fillColor    | string  |           | "#4668F2"     | :white_medium_square: | :white_square_button: |
| antialias    | boolean |           | true          | :white_medium_square: | :white_square_button: |
| opacity      | number  |           | 0.6           | :white_medium_square: | :white_square_button: |
| outlineColor | string  |           | undefined     | :white_medium_square: | :white_square_button: |

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

| Property | Type             | Interface | Default Value | Mandatory             | Reactive              |
| :------- | :--------------- | :-------- | :------------ | --------------------- | :-------------------- |
| radius   | number           |           |               | :white_medium_square: | :white_square_button: |
| center   | [number, number] |           |               | :white_medium_square: | :white_square_button: |
| edges    | number           |           | 10            | :white_square_button: | :white_square_button: |

#### radius

The radius of the circle in km

#### center

Center of your circle

#### edges

As the circle will be drawn as a polygon you might want to increase the number of edges to make it "rounder" or decrease to improve performance


## Rectangle

Rectangles will be drawn with a specific height and width.

### Properties

| Property | Type             | Interface | Default Value | Mandatory             | Reactive              |
| :------- | :--------------- | :-------- | :------------ | :-------------------- | --------------------- |
| center   | [number, number] |           |               | :white_square_button: | :white_square_button: |
| height   | number           |           |               | :white_square_button: | :white_square_button: |
| width    | number           |           |               | :white_square_button: | :white_square_button: |


#### center

Center of your rectangle

#### height

Height of your rectangle in km

#### width

Width of your rectangle in km



## Polygon

If you need more flexibility you can also draw polygons. All you need is a path array

### Properties

| Property | Type               | Interface | Default Value | Mandatory             | Reactive              |
| :------- | :----------------- | :-------- | :------------ | :-------------------- | --------------------- |
| path     | [number, number][] |           |               | :white_square_button: | :white_square_button: |

#### path

Path of your polygon represented by an array of points. please note that if you want to have a closed Polygon you will need to include your first point as the last one also to make your polygon closed.


### Examples

#### Pulsating Circle

To demonstrate the reactiveness of our component, we will create a circle that is pulsating. Lets add the following html

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-circle
    :center="[0,0]"
    :zoom="10"
    :radius="radius"
  />
</mapbox-map>
```

Now in our setup function we'll write the following

```ts
let radius = ref(20);
setInterval(() => {
  radius.value = 5 + 3*Math.abs(Math.sin(new Date()).getTime()/500)
}, 30)

return { radius }
```
This will make our circle pulsate between a radius of 5 and 8 km. The value is being calculated every 30 seconds. In the same way you can dynamically repaint all reactive properties of geogeometry components
