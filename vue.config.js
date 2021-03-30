// Not used by now but will be needed for testing
/**
 *  @typedef { import("@vue/cli-service").ProjectOptions } Options
 *  @type { Options }
 */
module.exports = {

  chainWebpack: config => {
    config.externals({ canvas: {} });
    config.devtool('inline-source-map');
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.isServerBuild = false;
        return options;
      });
  }
};