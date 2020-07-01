// npm i mini-css-extract-plugin
// 下载运行webpack dev服务器 
//npm i webpack-dev-server
//npx webpack-dev-server

const { resolve } = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

// 配置node环境变量(postcss-loader 或 postcss-preset-env 需要跟随node环境变化而变化) 默认是生产环境
process.env.NODE_ENV = "development"

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "./js/index.js",
        path: resolve(__dirname, "build")
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options:{
                            ident: "postcss",
                            "plugins": () => [
                                require("postcss-preset-env")()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        // 实例化html插件 目的牵引图片
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        //实例化MiniCssExtractPlugin 提取文件对象
        new MiniCssExtractPlugin({
            // 自定义提取的css文件名称
            // 若设置名称 为main.css
            filename: "css/index.css"
        }),
        //压缩css
        new optimizeCssAssetsWebpackPlugin()
    ],
    // 开发者模式
    mode: "development",
    // 运行服务器 npx webpack-dev-server 
    
    devServer:{
        port: 8000,
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        open: true
    }
}