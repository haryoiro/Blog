/* eslint-disable @typescript-eslint/no-var-requires */

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})

const createArticleListPages = require('./src/gatsby/createArticleListPages')
const createArticlePages = require('./src/gatsby/createArticlePages')

exports.createPages = async (GatsbyNode) => {
  const article = createArticlePages(GatsbyNode)
  const articleList = createArticleListPages(GatsbyNode)

  return Promise.all([article, articleList])
}
