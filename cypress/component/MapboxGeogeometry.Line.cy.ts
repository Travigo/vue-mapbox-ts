import { setDefaultInterceptors } from '@/../cypress/support/interceptors';
import { saveTempScreenshot } from '@/../cypress/support/visual/saveTempScreenshot';
import MapboxGeogeometryLineJoinAndCap from './scenarios/MapboxGeogeometryLine.joinAndCap.vue';

import config from '../support/config';

describe.only('MapboxGeogeometry.Line', () => {
  beforeEach(() => {
    setDefaultInterceptors();
  });

  it('successfully mounts', () => {
    cy.mount(MapboxGeogeometryLineJoinAndCap as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),        
      }
    });
  });

  it('will show the line with rounded cap and joins', () => {
    cy.mount(MapboxGeogeometryLineJoinAndCap as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),
        join: 'round',
        cap: 'round'
      },
    });
    
    cy.wait(config.defaultWaitTimes.line);

    const tempFile = saveTempScreenshot('canvas');

    cy.task('compare', {
      original: 'MapboxGeogeometry.Line.join-and-cap',
      compareTo: tempFile
    }).should('deep.equal', {
      match: true
    });
  });

 
});