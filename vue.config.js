module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "src/styles/colors", "src/styles/gradients";'
      }
    }
  }
}
