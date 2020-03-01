/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "js/[name].bundle.js",
        chunkFilename: "js/[id].chunk.js"
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.runtime.js"
        }
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        overlay: true,
        port: 8080,
        stats: {
            normal: true
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "sass-loader", options: { sourceMap: true } }
                ]
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
