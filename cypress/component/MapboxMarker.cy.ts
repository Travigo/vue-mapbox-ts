import { setDefaultInterceptors } from '@/../cypress/support/interceptors';
import MapboxMarkerBase from './scenarios/MapboxMarker.base.vue';
import MapboxMarkerPopup from './scenarios/MapboxMarker.popup.vue';

const accessToken = Cypress.env('ACCESS_TOKEN');

describe('MapboxMarker', () => {
  it('will mount', () => {
    cy.mount(MapboxMarkerBase as any, {
      props: {
        accessToken
      }
    });
  });

  it('will show a marker', () => {
    cy.mount(MapboxMarkerBase as any, {
      props: {
        accessToken
      }
    });

    cy.get('.mapboxgl-marker')
      .should('be.visible')
      .children('svg')
      .should('be.visible');
  });

  it('will correctly mount a popup to the marker that is initially hidden', () => {
    setDefaultInterceptors();

    cy.mount(MapboxMarkerPopup as any, {
      props: {
        accessToken
      }
    });

    cy.get('.mapbox-popup')
      .should('not.exist');

    cy.get('.mapboxgl-marker')
      .click();

    cy.get('.mapboxgl-popup')
      .should('be.visible')
      .contains('I am attached to the marker');
  });
});