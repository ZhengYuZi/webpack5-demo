/**
 * webpack公共配置
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootDir = process.cwd();

module.exports = {
    entry: path.resolve(rootDir, 'src/index.js'),
    output: {
        clean: true, // Clean the output directory before build.
        path: path.resolve(rootDir, 'dist'),
        filename: 'bundle.[contenthash:8].js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                include: path.resolve(rootDir, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer"], //css 自动添加前缀
                                ],
                            },
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                type: 'asset',
            },
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin() //打包后抽离 css 文件
        ],
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'public/index.html'),
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', //压缩打包后的 css 文件
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: '*.js',
                context: path.resolve(rootDir, "public/js"),
                to: path.resolve(rootDir, 'dist/js'),
            }, ],
        })
    ]
}