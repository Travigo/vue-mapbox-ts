# Geogeometry

All Geogeometry components can be supplied with the following optional features. 

The unit for distances in Geogeometry Components is always km.

Be default Geogeometry is generated with a fill. But you can change this. See 

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

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-rectangle
    :center="[3,8]"
    :width="10"
    :height="5"
  />
</mapbox-map>
```

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

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-polygon
    :path="[[0,0],[0,1],[1,1],[1,0],[0,0]]"
  />
</mapbox-map>
```

### Properties

| Property | Type               | Interface | Default Value | Mandatory             | Reactive              |
| :------- | :----------------- | :-------- | :------------ | :-------------------- | --------------------- |
| path     | [number, number][] |           |               | :white_square_button: | :white_square_button: |

#### path

Path of your polygon represented by an array of points. please note that if you want to have a closed Polygon you will need to include your first point as the last one also to make your polygon closed.

## Raw

If you want even more flexibility you can also use Raw geogeometry which will use raw geoJSON as input.
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-raw
    :source="myGeoJSON"
  />
</mapbox-map>
```


## Adding Popups
You can add popups to the popup slot. **Please note that this is a breaking change from versions < 0.3.0** where you would directly add popups as a child.
Adding a Popup would look like this
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-rectangle
    :center="[3,8]"
    :width="10"
    :height="5"
  />
    <template v-slot:popup>
      <mapbox-popup>
        <div>My glorious content</div>
      </mapbox-popup>
    </template>
  </mapbox-geogeometry-rectangle>
</mapbox-map>
```

## Using different paint options
Paint options are beeing introduced with version 0.3.0. As mentioned before by default a mapbox-geogeometry uses a fill. So this would be the equivalent of

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-rectangle
    :center="[3,8]"
    :width="10"
    :height="5"
  />
    <mapbox-geoegeometry-fill :color="red" :outlineColor="blue"/>
</mapbox-map>
```

You can also attach Popups. Please note that if you are using different paint options the popups will need to be added as a child of the paint option not the popup slot of the geogeometry.

Where possible the properties will match the name of the paint option from the [official Documentation](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill) but without the name of the paint type itsself. So fill-color becomes color. fill-antialias becomes antialias and so on. As more options are supported I will update those in the sections for the different paint properties here as well.

### Using Popups with paint options
```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-rectangle
    :center="[3,8]"
    :width="10"
    :height="5"
  />
    <mapbox-geoegeometry-fill color="red" outlineColor="blue">
      <mapbox-popup>
        <div>My Content</div>
      </mapbox-popup>
    </mapbox-geoegeometry-fill>
  </mapbox-geogeometry-rectangle>
</mapbox-map>
```

### Fill Option
Fill is the default option for geogeometry. So the possible propeties are the same as in the geogeometry itsself.
The following Fill Options currently supported are.
For more information on the fill properties please see mapboxs' [official Documentation](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill)


| Property     | Type    | Interface | Default Value | Mandatory             | Reactive              |
| :----------- | :------ | :-------- | :------------ | :-------------------- | --------------------- |
| color        | string  |           | '#4668F2'     | :white_medium_square: | :white_square_button: |
| antialias    | boolean |           | true          | :white_medium_square: | :white_square_button: |
| opacity      | number  |           | 0.6           | :white_medium_square: | :white_square_button: |
| outlineColor | string  |           | undefined     | :white_medium_square: | :white_square_button: |

### Line Option
You can also specify a line used instead or in addition to the fill option. Currently the following Line Properties are supported. For more information about the properties please see mapboxs' [official Documentation](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line)

| Property  | Type             | Interface      | Default Value | Mandatory             | Reactive              |
| :-------- | :--------------- | :------------- | :------------ | :-------------------- | --------------------- |
| blur      | number           |                | undefined     | :white_medium_square: | :white_square_button: |
| cap       | string           | CanvasLineCap  | undefined     | :white_medium_square: | :white_square_button: |
| join      | string           | CanvasLineJoin | undefined     | :white_medium_square: | :white_square_button: |
| opacity   | number           |                | 1             | :white_medium_square: | :white_square_button: |
| width     | number           |                | undefined     | :white_medium_square: | :white_square_button: |
| translate | [number, number] |                | undefined     | :white_medium_square: | :white_square_button: |
| offset    | number           |                | undefined     | :white_medium_square: | :white_square_button: |



## Examples

### Pulsating Circle

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

Now in our setup function we'll write the following. For animating there is a little class implemented in vue-mapbox-ts that wraps around the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to make animating a little easier. Of course you could also write your own function with requestAnimationFrame like in the [example by mapbox](https://docs.mapbox.com/mapbox-gl-js/example/animate-point-along-line/)

The Constructors first argument is the data you want to be present in your animation. In this case we just need the radius.

The second argument is the function itsself. Data will contain the data you injected in the first argument. The timestamp is identical as how you would use it in requestAnimationFrame. One thing to keep in mind is you won't need to call the animation function recursivly like you normally would.

The last argument is the options object. Which currently only contains the options speed. Speed defaults to 1 but you can set it as you like to in- or decrease the speed of your animation.

You then start the animation with animation.start(). There are also the options *pause* *reset* and *stop*
```ts
let radius = ref(20);
const animation = new Animation(
  { radius },
  (data, timestamp) => {
    data.radius.value = 5 + Math.abs(Math.sin(timestamp/1000))*5
  }, {
    speed: 1
  }
);
animation.start();

return { radius }
```
This will make our circle pulsate between a radius of 5 and 8 km. The value is being calculated every 30 seconds. In the same way you can dynamically repaint all reactive properties of geogeometry components

### Geogeometry with Paint for Fill and Line and a popup

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-geogeometry-rectangle
    :center="[3,8]"
    :width="10"
    :height="5"
  />
    <mapbox-geoegeometry-fill color="red" outlineColor="blue">
      <mapbox-popup>
        <div>My Content</div>
      </mapbox-popup>
    </mapbox-geoegeometry-fill>
    
    <mapbox-geogeometry-line :width="20" color="yellow" />
  </mapbox-geogeometry-rectangle>
</mapbox-map>
```