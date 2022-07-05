import { setDefaultInterceptors } from '@/../cypress/support/interceptors';

import MapboxScaleControl from './scenarios/MapboxScaleControl.base.vue';

const accessToken = Cypress.env('ACCESS_TOKEN');

describe('MapboxNavigationControl', () => {
  
  beforeEach(() => {
    setDefaultInterceptors();
  });

  it('mounts', () => {
    cy.mount(MapboxScaleControl as any, {
      props: {
        accessToken
      }
    });
  });

  it('will display the correct default unit as metric', () => {
    cy.mount(MapboxScaleControl as any, {
      props: { 
        accessToken,
      }
    });

    cy.get('.mapboxgl-ctrl-scale').contains('km');
  });

  it('will display the correct unit as imperial when set to it', () => {
    cy.mount(MapboxScaleControl as any, {
      props: { 
        accessToken,
        unit: 'imperial'
      }
    });

    cy.get('.mapboxgl-ctrl-scale').contains('mi');
  });


});