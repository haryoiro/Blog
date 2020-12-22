/* eslint-disable import/no-unresolved */
const path = require('path')

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})

const createArticleListPages = require('./src/gatsby/createArticleListPages')
const createArticlePages = require('./src/gatsby/createArticlePages')

exports.createPages = async (GatsbyNode) => {
  const articleTemplate = path.resolve(__dirname, './src/templates/article.tsx')
  const articleListTemplate = path.resolve(__dirname, './src/templates/articleList.tsx')

  const article = createArticlePages(GatsbyNode, articleTemplate)
  const articleList = createArticleListPages(GatsbyNode, articleListTemplate)

  return Promise.all([article, articleList])
}
