import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from "eslint-webpack-plugin";

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "http://localhost:4001/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
        async: false
    }),
    new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"]
    }),
    new ModuleFederationPlugin({
        name: "app2",
        filename: "remoteEntry.js",
        library: { type: "var", name: "app2" },
        exposes: {
          "./CustomButton": './src/components/CustomButton'
        },
        shared: {
          react: { singleton: true, eager: true },
          "react-dom": { singleton: true, eager: true }
        }
    })
  ],
  devtool: "inline-source-map",

  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4001,
    open: true,
    hot: true
  }
};

export default config;