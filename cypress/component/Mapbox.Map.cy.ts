import MapboxMapBase from './scenarios/MapboxMap.base.vue';

describe('MapboxMap.base', () => {
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
});