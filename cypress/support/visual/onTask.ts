import { compare } from 'odiff-bin';
import path from 'path';
import fs from 'fs';

export const onTask = (on: Cypress.PluginEvents, config:Cypress.PluginConfigOptions) => {
  const pathTempFiles = 'cypress/screenshots';
  const pathExamples = 'cypress/component/scenarios/screenshots';

  let lastScreenshotPath:string|null = null;
  let lastScreenshotName:string|null = null;
  
  on('task', {
    compare: async ({ original, options }) => {
      if(!lastScreenshotPath)
        return;
      

      const baseFile:string = `${pathExamples}/${original}.png`;
      const tempFile = `${lastScreenshotPath}/${lastScreenshotName}.png`;
      const diffFile = `${lastScreenshotPath}/${lastScreenshotName}.diff.png`;


      return await compare(baseFile, tempFile, diffFile, options);
    }
  });

  on('after:screenshot', (details) => {
    lastScreenshotPath = details
      .path.split('/').slice(0,-1).join('/');
    lastScreenshotName = details.name;
  });
};