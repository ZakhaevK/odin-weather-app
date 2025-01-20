// webpack.config.js
/* 
This is a Webpack configuration file that contains all details
needed for bundling, like entry point, output destination, and 
anything like plugins and loaders.
*/
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  }
});
