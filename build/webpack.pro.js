/**
 * webpack 生产环境配置
 */

const {
  merge
} = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    },
    version: 'new_version'  //放弃使用缓存
  },
});