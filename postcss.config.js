const postcssPresetEnv = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = () => ({
  plugins: [
    postcssPresetEnv({ stage: 0 }),
    autoprefixer(),
    cssnano({ autoprefixer: false }),
  ],
})
