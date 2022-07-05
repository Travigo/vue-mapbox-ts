import { setDefaultInterceptors } from '@/../cypress/support/interceptors';
import { saveTempScreenshot } from '@/../cypress/support/visual/saveTempScreenshot';
import MapboxGeogeometryRectangleBase from './scenarios/MapboxGeogeometryRectangle.base.vue';

import config from '../support/config';

describe('MapboxGeogeometry.Rectangle', () => {
  beforeEach(() => {
    setDefaultInterceptors();
  });

  it('successfully mounts', () => {
    cy.mount(MapboxGeogeometryRectangleBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),
        center: [0,0],
        width: 500,
        height: 400
      }
    });
  });

  it('will show a rectangle', () => {
    cy.mount(MapboxGeogeometryRectangleBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),
        center: [0,0],
        width: 800,
        height: 400
      }
    }).wait(config.defaultWaitTimes.geogeometryRectangle);

    const tempFile = saveTempScreenshot('canvas');

    cy.task('compare', {
      original: 'MapboxGeogeometry.Rectangle.base',
      compareTo: tempFile
    }).should('deep.equal', {
      match: true
    });
  });

  it('will correctly rotate the rectangle', () => {
    cy.mount(MapboxGeogeometryRectangleBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),
        center: [0,0],
        width: 800,
        height: 400,
        rotationDeg: 15
      }
    }).wait(config.defaultWaitTimes.geogeometryRectangle);

    const tempFile = saveTempScreenshot('canvas');

    cy.task('compare', {
      original: 'MapboxGeogeometry.Rectangle.base-rotated',
      compareTo: tempFile
    }).should('deep.equal', {
      match: true
    });
  });
});