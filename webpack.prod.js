/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.[contentHash].bundle.js"
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.runtime.min.js"
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new LodashModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        "default",
                        { discardComments: { removeAll: true } }
                    ]
                }
            })
        ]
    }
});
