import { compare } from 'odiff-bin';

export const onTask = (on: Cypress.PluginEvents, config:Cypress.PluginConfigOptions) => {
  on('task', {
    compare: async ({ original, compareTo, options }) => {     

      const pathTempFiles = 'cypress/screenshots';
      const pathExamples = 'cypress/component/scenarios/screenshots';      

      const baseFile = `${pathExamples}/${original}.png`;
      const tempFile = `${pathTempFiles}/${compareTo}.png`;
      const diffFile = `${pathTempFiles}/${compareTo}.diff.png`;


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
};