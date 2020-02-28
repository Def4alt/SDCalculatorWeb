/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        scss:
                            "vue-style-loader!node-sass!sass-loader!css-loader", // <style lang="scss">
                        sass:
                            "vue-style-loader!css-loader!sass-loader?indentedSyntax" // <style lang="sass">
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
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
                        loader: "file-loader"
                    }
                ]
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
};
