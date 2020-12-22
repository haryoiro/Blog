'use strict'

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
})
const path = require('path')

const createArticleListPages = require('./.gatsby/createArticleListPages')
const createArticlePages = require('./.gatsby/createArticlePages')

exports.createPages = async (GatsbyNode) => {
  const articleTemplate = path.resolve(__dirname, './src/templates/article.tsx')
  const articleListTemplate = path.resolve(__dirname, './src/templates/articleList.tsx')

  const article = createArticlePages(GatsbyNode, articleTemplate)
  const articleList = createArticleListPages(GatsbyNode, articleListTemplate)

  return Promise.all([article, articleList])
}
