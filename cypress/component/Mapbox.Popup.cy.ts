import { setDefaultInterceptors } from '@/../cypress/support/interceptors';
import MapboxPopupBase from './scenarios/MapboxPopup.base.vue';

const accessToken = Cypress.env('ACCESS_TOKEN');

describe('MapboxMarker', () => {
  beforeEach(() => {
    setDefaultInterceptors();
  });

  it('will mount', () => {

    cy.mount(MapboxPopupBase as any, {
      props: {
        accessToken
      }
    });
  });

  it('will show a popup with correct content', () => {
    cy.mount(MapboxPopupBase as any, {
      props: {
        accessToken
      }
    }).wait(500);

    cy
      .get('.mapboxgl-popup')
      .should('be.visible')
      .contains('Hello World');
  });
});