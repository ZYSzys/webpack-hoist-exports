module.exports = {
  mode: 'production',
  optimization: {
    noEmitOnErrors: true,
  },

  performance: {
    hints: false,
  },

  stats: {
    modules: false,
    children: false,
    performance: false,
    entrypoints: false,
    colors: true,
  },

  // Fail out on the first error instead of tolerating it
  bail: true,
}
