const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 4200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Permitir todos los orígenes
    },
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
      name: "hostApp",
      // filename: "remoteEntry.js",
      remotes: {
        components: "reactRemote@http://localhost:8080/remoteEntry.js",
      },
      shared: {
        // Paquetes compartidos (ej: Angular, librerías de UI)
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
        react: { singleton: true, eager: true, requiredVersion: '18.2.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '18.2.0' },
      },
    }),
    /* new HtmlWebpackPlugin({
      template: "./public/index.html",
    }), */
  ],
};
