const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = (env, argv) => {
    const prod = argv.mode === "production";
    
    return {
        mode: prod ? "production" : "development",
        devtool: prod ? "hidden-source-map" : "eval",
        entry: "./src/Index.tsx",
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "[name].[contenthash].js", // 파일 content 기반으로 해시값 생성
            publicPath: "/",
        },
        devServer: {
            historyApiFallback: true,
            port: 3000,
            hot: true,  
            open: true // Browser open  
        },
        resolve: {  
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["babel-loader", "ts-loader"],
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "index.html",
                minify: process.env.NODE_ENV === "production" ? {
                    collapseWhitespace: true, // 빈칸 제거
                    removeComments: true, // 주석 제거
                } : false,
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css"
            }),
            new ESLintPlugin({
                emitWarning: false
            }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(dotenv.config().parsed)
            })
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
            }
        }
    };
}; 
