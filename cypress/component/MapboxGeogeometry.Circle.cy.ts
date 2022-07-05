import { setDefaultInterceptors } from '@/../cypress/support/interceptors';
import { saveTempScreenshot } from '@/../cypress/support/visual/saveTempScreenshot';
import MapboxGeogeometryCircleBase from './scenarios/MapboxGeogeometryCircle.base.vue';

const defaultWaitMs = 2500;

describe('MapboxGeogeometry.Circle', () => {
  beforeEach(() => {
    setDefaultInterceptors();
  });

  it('successfully mounts', () => {
    cy.mount(MapboxGeogeometryCircleBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),
        center: [0,0],
        radius: 300
      }
    });
  });

  it('will show a circle with correct dimensions', () => {
    cy.mount(MapboxGeogeometryCircleBase as any, {
      props: {
        accessToken: Cypress.env('ACCESS_TOKEN'),
        center: [0,0],
        radius: 300
      }
    });
    
    cy.wait(defaultWaitMs);

    const tempFile = saveTempScreenshot('canvas');

    cy.task('compare', {
      original: 'MapboxGeogeometry.Circle.base',
      compareTo: tempFile
    }).should('deep.equal', {
      match: true
    });
  });

  it('radius is reactive', () => {
    const props = {
      accessToken: Cypress.env('ACCESS_TOKEN'),
      center: [0,0],
      radius: 300
    };

    cy.mount(MapboxGeogeometryCircleBase as any, {
      props
    }).wait(defaultWaitMs);

    
    props.radius = 800;
    cy.wait(500);
    const tempFile = saveTempScreenshot('canvas');


    cy.task('compare', {
      original: 'MapboxGeogeometry.Circle.reactive-radius',
      compareTo: tempFile
    }).should('deep.equal', {
      match: true
    });
  });
});