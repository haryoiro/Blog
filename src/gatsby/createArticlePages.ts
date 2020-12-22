import path from 'path'
import { GatsbyNode } from "gatsby"

type Articles = {
  allContentfulArticles: {
    edges: Array<{ 
      node: {
        slug: string
      }
    }>
  }
}

const createArticlePages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => graphql<Articles>(`
query CreateArticlePages {
  allContentfulArticles {
    edges {
      node {
        slug
      }
    }
  }
}`).then(result => {
  // Handle errors
  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return;
  }

  const posts = result.data.allContentfulArticles.edges

  posts?.forEach(({ node: { slug } }) => {
    createPage({
      path: `/blog/${slug}`,
      component: path.resolve('src/templates/article.tsx'),
      context: {
        slug: slug,
      },
    })
  })
})

module.exports = createArticlePages