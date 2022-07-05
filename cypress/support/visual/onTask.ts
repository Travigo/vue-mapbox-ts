import { compare } from 'odiff-bin';
import path from 'path';
import fs from 'fs';

export const onTask = (on: Cypress.PluginEvents, config:Cypress.PluginConfigOptions) => {
  const pathTempFiles = 'cypress/screenshots';
  const pathExamples = 'cypress/component/scenarios/screenshots';

  let lastScreenshotPath:string|null = null;
  let lastScreenshotName:string|null = null;
  
  on('task', {
    compare: async ({ original, compareTo, options }) => {
      if(!lastScreenshotPath){
        console.log('cannot compare. No last screenshot found');
        return;
      }

      const baseFile = `${pathExamples}/${original}.png`;
      const tempFile = lastScreenshotPath;
      const diffFile = `${lastScreenshotPath}.diff.png`;


      console.log(`Comparing base image ${baseFile} to new image ${tempFile}`);

      if(options)
        console.log(`odiff opts: ${options}`);

      const started = Date.now();
      const result = await compare(baseFile, tempFile, diffFile, options);
      const elapsed = Date.now()-started;

      console.log(`comparison took ${elapsed} ms`);
      console.log(result);
      return result;
    }
  });

  on('after:screenshot', (details) => {
    lastScreenshotPath = details.path;
    lastScreenshotName = details.name;
  });
};