module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "src/styles/variables"; @import "src/styles/commonStyles";'
      }
    }
  }
}
