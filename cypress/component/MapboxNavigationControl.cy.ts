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
});