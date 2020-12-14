const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
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
  }`)

  if (result.error) { throw result.error }

  const posts = result.data.allContentfulArticles.edges
  console.log(posts)
  posts.forEach((edge) => {
    const subDir = `/article/${edge.node.slug}`
    createPage({
      path: subDir,
      component: path.resolve(
        './src/templates/article.tsx',
      ),
      context: {
        slug: edge.node.slug,
        id: edge.node.id,
      },
    })
  })
}
