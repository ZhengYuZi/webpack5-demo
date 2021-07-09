/**
 * webpack 预发配置
 */

 const { merge } = require('webpack-merge');
 const baseConfig = require('./webpack.base');
 
 module.exports = merge(baseConfig, {
   mode: 'production',
   devtool: 'hidden-source-map',
 });
 