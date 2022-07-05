import { defineConfig } from 'cypress';

import { onTask } from './cypress/support/visual/onTask';

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue-cli',
      bundler: 'webpack',
    },
    requestTimeout: 20000,
    responseTimeout: 20000,
    execTimeout: 20000,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 20000,
    setupNodeEvents: (on, config) => {
      onTask(on, config);
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
