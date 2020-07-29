module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "src/styles/variables"; @import "src/styles/commonStyles";'
      }
    }
  },
  devServer: {
    port: process.env.VUE_APP_DEV_SERVER_PORT
  }
}
