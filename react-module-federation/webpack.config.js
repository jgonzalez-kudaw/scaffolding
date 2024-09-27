const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "http://127.0.0.1:8083/"
  },
  devServer: {
    port: 8083,
    headers: {
      "Access-Control-Allow-Origin": "*", // Permitir todos los orígenes
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,

        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,

        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
    ],
  },

  target: "web",

  plugins: [
    new ModuleFederationPlugin({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
    /* new HtmlWebpackPlugin({
      template: "./public/index.html",
    }), */
  ],
};
