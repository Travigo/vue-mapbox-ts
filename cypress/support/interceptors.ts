export const setDefaultInterceptors = () => {
  cy.intercept({
    method: 'POST',
    url: 'https://events.mapbox.com/events/v2?access_token=pk.eyJ1IjoiYmFsZWFyLXJlYWwtZXN0YXRlIiwiYSI6ImNsNTVvejU5bTFiYmYzbHJ4dGY1ejR6cDAifQ.aN5_6wQ1XOe4fBhFdebixQ',
  }, {
    statusCode: 203,
    headers: {
      'Content-Type': 'text/plain',
      'Referer': 'http://localhost:8080/',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/10.3.0 Chrome/100.0.4896.160 Electron/18.3.0 Safari/537.36'
    }
  }).as('postEvents');

  cy.intercept({
    method: 'GET',
    url: '**/map-sessions/*',
  }, {
    statusCode: 200
  }).as('getMapSession');

  cy.intercept({
    method: 'GET',
    url: '**/styles/v1/mapbox/streets-v11*',
  }, {
    statusCode: 200,
    fixture: 'v1.streets.v11.json'
  }).as('getMapboxStylev1');

  cy.intercept({
    method: 'GET',
    url: '**/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2.json*',
  }, {
    statusCode: 200,
    fixture: 'v4.streets.v11.json'
  }).as('getMapboxStylev4');

  // cy.intercept({
  //   path: '**/0-255.pbf*'
  // }, {
  //   fixture: '0-255.pbf'
  // }).as('get.0-255.pbf');
};