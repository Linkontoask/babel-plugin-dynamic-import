module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      require('./dist/index.js'),
      { libraryName: 'v-easy-components', libraryDirectory: 'lib' },
    ],
  ],
}
