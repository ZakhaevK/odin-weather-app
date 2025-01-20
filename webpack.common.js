/* eslint-disable no-undef */
// webpack.config.js
/* 
This is a Webpack configuration file that contains all details
needed for bundling, like entry point, output destination, and 
anything like plugins and loaders.
*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"), // Output directory, in this case, dist
    clean: true, // Empties output directory each time webpack is run to bundle
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
