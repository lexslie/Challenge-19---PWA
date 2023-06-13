const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // webpack plugin to generate html
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.E."
      }),
      // workbox plugins for service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // workbox plugins for manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "text-editor",
        short_name: "J.A.T.E.",
        description: "Just Another Text Editor",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [{
          src: path.resolve("src/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        }],
      }),
    ],

    module: {
      // adding css loaders and babel to webpack
      rules: [
        {
          test: /\.css$/i,
          use: ["styl-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presents: ["@babel.present-env"],
              plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"]
            },
          },
        },
      ],
    },
  };
};