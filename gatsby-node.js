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
<<<<<<< Updated upstream

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
=======
>>>>>>> Stashed changes
