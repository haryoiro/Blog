import path from 'path'
import { GatsbyNode } from 'gatsby'

import { CreateArticleListPagesQuery } from '../../types/graphql-types'

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

const createArticlePages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => graphql<Articles | CreateArticleListPagesQuery>(`
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
}`).then((result) => {
  // Handle errors
  if (result.errors || !result.data) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  const posts = result.data.allMdx.edges
  if (!posts) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  posts.forEach(({ node }) => {
    const slug = node.frontmatter?.slug
    if (slug) {
      createPage({
        path: `/blog/${slug}`,
        component: path.resolve('src/templates/article.tsx'),
        context: {
          slug,
        },
      })
    }
  })
})

module.exports = createArticlePages
