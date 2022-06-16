# Geocoder Control

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
## Custom Input

As the default design of the geocoder control from mapbox does not integrate well with all designs you can also use your own custom input

**Geocoder Control with custom input**
```html
<mapbox-geocoder-control :accessToken="myAccessToken" @result="handleResult">
  <template v-slot:input="{result, results}">
    <input>
    <div>{{ result ? result.place_name : 'no result' }}</div>
    <div>{{ results.features ? results.features.map(f => f.place_name) : 'no results' }}</div>
</mapbox-geocoder-control>
```
Available apart from result and results is also error and loading. Also take a look at the [official documentation](https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md#on) of mapbox geocoder for more details.

This should also work for frameworks like vuetify as the geocoder control will search for any input down the slot and attach the geocoder to it.


## Properties

All options from Mapbox-Gl-Geocoder can be used as properties for this component. Please see the official [documentation](https://github.com/mapbox/mapbox-gl-geocoder/blob/master/API.md#parameters) for more information. I will add a table of Properties at a later time. Please also note that these properties are not yet reactive. So changing a propery e.g. your language will not update the geocoders language. This feature will be added in the future though.

## Events

All Events from Mapbox-Gl-Geocoder are also available as component events. These events are

| Event   | Return Type |
| :------ | :---------- |
| result  | Object      |
| results | Object      |
| error   | string      |
| loading | Object      |
| clear   | -           |


#### result
Gets triggered when user receives a result (after hitting Enter or selecting a result)

#### results
Gets triggered every time a user enters something and represents the search results

#### error
Triggered when an error occurs

#### loading
Gets triggered every time a user hits a key and represents his search query

#### clear
Gets triggered every time a user clears the input field

## Examples

### Dynamically adding Markers for every new search result

In this example we want to add a new marker to our map every time the user selects a result from the control. This marker shall contain a popup with the place name of the result.

Please note that you will have to set the geocoders *marker* property to false to disable the built in functionality of mapbox to show the last result via marker. Also your parent component
should include an array *results* in your data and a method *pushResults*

**template**
```html
<mapbox-map :access-token="myAccessToken">
  <mapbox-geocoder-control @result="pushResult" :marker="false" />
  <mapbox-marker v-for="let result of results">
    <mapbox-popup>
      <div>{{ result.place_name}}</div>
    </mapbox-popup>
  </mapbox-marker>
</mapbox-map>
```

**snippet for pushResult method**
```js
(res) => {
  results.value.push(res);
}
```



