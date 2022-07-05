import { setDefaultInterceptors } from '@/../cypress/support/interceptors';
import { saveTempScreenshot } from '@/../cypress/support/visual/saveTempScreenshot';
import config from '@/../cypress/support/config';
import MapboxMapBase from './scenarios/MapboxMap.base.vue';




describe('MapboxMap.base', () => {
  beforeEach(() => {
    setDefaultInterceptors();
  });

  it('successfully mounts a map', () => {
    cy.mount(MapboxMapBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN')
      }
    });
  });

  it('will fill out the embedding div by 100%', () => {
    cy.mount(MapboxMapBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN')
      }
    });
    cy.get('.mapbox-map').invoke('outerWidth').should('equal', 400);
    cy.get('.mapbox-map').invoke('outerHeight').should('equal',300);
  });

  it('will render a globe when projection is set accordingly', () => {
    cy.mount(MapboxMapBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),
        projection: 'globe',
        zoom: 1,
        // center: [0,0],
        // mapStyle:'mapbox://styles/mapbox/satellite-streets-v11'
      }
    });
    cy.wait(config.defaultWaitTimes.map);

    const filename = saveTempScreenshot('canvas');

    cy.task('compare', {
      original: 'MapboxMap.base.globe',
      compareTo: filename
    }).should('deep.equal', {
      match: true
    });
  });

  // Needs to be implemented. Not working yet
  // it('mapStyle is reactive', () => {
  //   const props = {
  //     accessToken: Cypress.env('ACCESS_TOKEN'),
  //     mapStyle:'mapbox://styles/mapbox/streets-v11',
  //     center: [0,0]
  //   };

  //   cy.mount(MapboxMapBase as any, {
  //     props
  //   });
  //   cy
  //     .wait(config.defaultWaitTimes.map)
  //     .then(() => {saveTempScreenshot('canvas');})
  //     .then(() => {props.mapStyle='mapbox://styles/mapbox/light-v10'; })
  //     .wait(config.defaultWaitTimes.map)
  //     .then(() => {
  //       const filename = saveTempScreenshot('canvas');

    
  //       cy.task('compare', {
  //         original: 'MapboxMap.base.globe',
  //         compareTo: filename
  //       }).should('deep.equal', {
  //         match: true
  //       });
  //     });
  // });
});