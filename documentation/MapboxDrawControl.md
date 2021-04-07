# Mapbox Draw control

To add a draw control simply add it to your map

```html
<mapbox-map :accessToken="myAccessToken">
  <mapbox-draw-control/>  
</mapbox-map>
```

## Events

Multiple Events are available for the draw control. Also see the official [documentation](https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md)


Please note that the parameter style cannot be used as it is already reserved by Vue to configure css styling. to use a different style for your map use the property *mapStyle* In addition to the mapbox-gl parameters properties are

| Property        | Type               | Interface | Default Value | Mandatory             | Reactive              |
| :-------------- | :----------------- | :-------- | :------------ | --------------------- | --------------------- |
| loaded          | DrawControlOptions |           |               | :white_medium_square: | :white_square_button: |
| create          | DrawEvent          |           |               | :white_medium_square: | :white_square_button: |
| update          | DrawEvent          |           |               | :white_medium_square: | :white_square_button: |
| delete          | DrawEvent          |           |               | :white_medium_square: | :white_square_button: |
| selectionChange | DrawEvent          |           |               | :white_medium_square: | :white_square_button: |


#### loaded
Returns the drawControl after it has been added to the map

#### create
Fired when an object has been drawn

#### update
Fired when an object has been updated

#### delete
Fired when an object gets deleted

#### selectionChange
Fired when a selection is changed
