/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    entry: path.resolve(__dirname, "src", "main.ts"),
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".json", ".vue"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            assets: path.resolve(__dirname, "src", "assets")
        }
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/
            },
            {
                exclude: /node_modules/,
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/[name].[hash].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "SDCalculator",
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: path.resolve(__dirname, "public", "favicon.ico")
        })
    ]
};
