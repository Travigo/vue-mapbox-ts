export const setDefaultInterceptors = () => {
  cy.intercept({
    method: 'POST',
    url: '**/events/v2*',
  }, {
    statusCode: 203,
    headers: {
      'Content-Type': 'text/plain',
      'Referer': 'http://localhost:8080/',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Cypress/10.3.0 Chrome/100.0.4896.160 Electron/18.3.0 Safari/537.36'
    }
  }).as('postEvents');

  cy.intercept({
    url: '**api.mapbox.com/map-sessions/v1?'
  }, {
    statusCode: 200
  });

  cy.intercept({
    method: 'GET',
    url: '**/styles/v1/mapbox/streets-v11/sprite.json*'
  }, {
    statusCode: 200,
    fixture: 'v1.mapbox.streets-v11.sprite.json'
  }).as('getSpriteJson');

  cy.intercept({
    method: 'GET',
    url: '**/styles/v1/mapbox/streets-v11/sprite.png*'
  }, {
    statusCode: 200,
    fixture: 'v1.mapbox.streets-v11.sprite.png',
    headers: {
      'content-type': 'image/png',
      'etag': 'sprite-4.5.8-v1/mapbox-streets-v11',
      'Transfer-Encoding': 'chunked'
    }
  }).as('getSpritePng');

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


  // COULD NOT MAKE PBF MOCKING WORK SO FAR. SEEMS LIKE A BUG WITH GZIP ENCODING
  // cy.intercept({
  //   method: 'GET',
  //   url: '**/fonts/v1/mapbox/DIN%20Offc%20Pro%20Italic,Arial%20Unicode%20MS%20Regular/0-255.pbf?*',
  // }, {
  //   // fixture: 'fonts/italic.arial.0-255.pbf',
  //   fixture: 'temp/out3.pbf,binary',
  //   statusCode: 204,
  //   headers: {
  //     'Connection': 'keep-alive',
  //     'Keep-Alive': 'timeout=5',
  //     'Transfer-Encoding': 'chunked',
  //     'access-control-allow-origin': '*',
  //     'access-control-expose-headers': 'Link',
  //     'age': '11631145',
  //     'cache-control': 'max-age=31536000',
  //     // 'content-length': '10',
  //     'content-encoding': 'compress',
  //     'content-type': 'application/x-protobuf',
  //     'date': 'Sat, 19 Feb 2022 20:46:43 GMT',
  //     'etag': 'W/"b040-+eCb/OHkPqToOcONTDlvpCrjmvs"',
  //     'via': '1.1 4dd80d99fd5d0f6baaaf5179cd921f72.cloudfront.net (CloudFront)',
  //     'x-amz-cf-id': '4uY9rjBgR_R12nkfHFrBMLEpNuWygW9DkmODlMEzwJHABTGCGg8pww==',
  //     'x-amz-cf-pop': 'FRA56-P7',
  //     'x-cache': 'Hit from cloudfront',
  //     'x-origin': 'Mbx-Fonts'
  //   }
  // }).as('get.0-255.pbf').as('getItalicArial0-255');
};