const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('./src/templates/article.tsx')
  const result = await graphql(`
  {
    allContentfulArticles {
      edges {
        node {
          body {
            child: childMdx {
              text: excerpt
            }
          }
          id
          createdAt
          title
          tags
          slug
        }
      }
    }
  }`).catch((error) => { throw error })

  const posts = result.data.allContentfulArticles.edges

  posts.forEach((edge) => {
    const subDir = `/article/${edge.node.slug}`
    createPage({
      path: subDir,
      component: blogPostTemplate,
      context: {
        slug: edge.node.slug,
        id: edge.node.id,
      },
    })
  })
}
