const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Plugin to generate the main HTML file //
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        chunks: ["main"],
        title: "J.A.T.E."
      }),

      // Plugin to generate the installation HTML file //
      new HtmlWebpackPlugin({
        template: "./src/install.html",
        filename: "install.html",
        chunks: ["install"],
      }),

      // Plugin to generate the web app manifest file //
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Allows quick editing of notes and storing them locally.",
        background_color: "#ffffff",
        theme_color: "#000000",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/assets/icons/icon_96x96.png"),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),

      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "sw.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-object-rest-spread", ":@babel/transform-runtime"]
            },
          },
        },
      ],
    },
  };
};
