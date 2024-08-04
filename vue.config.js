const { defineConfig } = require('@vue/cli-service')

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|html)?$/i,     // 压缩文件格式
        filename: '[path][base].gz[query]',   // 压缩后的文件名
        algorithm: 'gzip',              // 使用gzip压缩
        minRatio: 0.8                   // 压缩率小于1才会压缩
      })
    ]
  }
})
