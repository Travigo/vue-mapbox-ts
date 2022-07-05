import { setDefaultInterceptors } from '@/../cypress/support/interceptors';

import MapboxNavigationControlBase from './scenarios/MapboxNavigationControl.base.vue';

const accessToken = Cypress.env('ACCESS_TOKEN');

describe('MapboxNavigationControl', () => {
  
  beforeEach(() => {
    setDefaultInterceptors();
  });

  it('mounts', () => {
    cy.mount(MapboxNavigationControlBase as any, {
      props: {
        accessToken
      }
    });
  });

  it('will display the control in the correct corner', () => {
    cy.mount(MapboxNavigationControlBase as any, {
      props: { 
        accessToken,
        position: 'top-right'
      }
    });

    cy.get('.mapboxgl-ctrl-top-right').find('.mapboxgl-ctrl-zoom-in').should('exist');
    cy.get('.mapboxgl-ctrl-top-right').find('.mapboxgl-ctrl-zoom-out').should('exist');
    cy.get('.mapboxgl-ctrl-top-right').find('.mapboxgl-ctrl-compass').should('exist');

    cy.get('.mapboxgl-ctrl-bottom-left').find('.mapboxgl-ctrl-zoom-in').should('not.exist');
    cy.get('.mapboxgl-ctrl-bottom-left').find('.mapboxgl-ctrl-zoom-out').should('not.exist');
    cy.get('.mapboxgl-ctrl-bottom-left').find('.mapboxgl-ctrl-zoom-compass').should('not.exist');

  });


});