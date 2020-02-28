/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.[contentHash].bundle.js"
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new LodashModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "SDCalculator",
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: path.resolve(__dirname, "public", "favicon.ico"),
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    optimization: {
        minimizer: [new TerserPlugin(), new CleanWebpackPlugin()]
    }
});
