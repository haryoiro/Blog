/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'path'
import { GatsbyNode } from 'gatsby'

// @ts-ignore
import { CreateArticlePagesQuery } from '../../types/graphql-types'

const createArticlePages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => graphql<CreateArticlePagesQuery>(`
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

  // @ts-ignore
  posts.forEach(({ node: { frontmatter: { slug } } }) => {
    createPage({
      path: `/blog/${slug}`.toLowerCase(),
      component: path.resolve('src/templates/ArticleTemplate/index.tsx'),

      context: {
        slug,
      },
    })
  })
})

module.exports = createArticlePages
