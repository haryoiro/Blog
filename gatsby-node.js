/* eslint-disable @typescript-eslint/no-var-requires */
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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)

    const collection = {
      source: parent.sourceInstanceNames.map,
      createdAt: parent.birthTime,
      updatedAt: parent.changeTime,
    }

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    })
  }
}
