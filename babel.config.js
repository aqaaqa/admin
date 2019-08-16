// module.exports = {
//   presets: [
//     '@vue/app'
//   ]
// }
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]
  ]
}