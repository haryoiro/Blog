import path from 'path'
import { GatsbyNode } from "gatsby"

type Articles = {
  allMdx: {
    edges: Array<{ 
      node: {
        frontmatter: { 
          slug: string | null | undefined,
        }
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
  allMdx {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
}`).then(result => {
  // Handle errors
  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return;
  }

  const posts = result.data.allMdx.edges
  if (!posts) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return;
  }

  posts.forEach(({ node: { frontmatter: { slug }} }) => {
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