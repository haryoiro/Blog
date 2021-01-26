/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'path'
import { CreatePagesArgs, GatsbyNode } from 'gatsby'

import {
  CreateArticleListPagesQuery,
  CreateArticlePagesQuery
} from './types/graphql-types'

const createArticleListPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter
}) =>
  graphql<CreateArticleListPagesQuery>(`
    query CreateArticleListPages {
      allMdx(limit: 1000, filter: { frontmatter: { wip: { nin: true } } }) {
        tags: group(field: frontmatter___tags) {
          fieldValue
        }
        edges {
          node {
            frontmatter {
              slug
              tags
            }
          }
        }
      }
    }
  `)
    // eslint-disable-next-line consistent-return
    .then(result => {
      if (result.errors || !result.data)
        return reporter.panicOnBuild('Error while running GraphQL query.')

      // すべての記事
      const posts = result.data.allMdx.edges
      if (!posts)
        return reporter.panicOnBuild('Error while running GraphQL query.')

      // =================================================================
      // ArticleListPages
      // =================================================================
      // ページあたりの記事数
      const postsPerPage = 6
      const numPages = Math.ceil(posts.length / postsPerPage)

      Array.from({ length: numPages }).forEach((_, i) => {
        // 配列のindexをもとにページ番号を割り当て。
        const pagePath = i === 0 ? '/blog/' : `/blog/${i + 1}/`
        createPage({
          path: pagePath,
          component: path.resolve(
            'src/templates/ArticleListTemplate/index.tsx'
          ),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1
          }
        })
      })

      // =================================================================
      // TagsPages
      // =================================================================
      const { tags } = result.data.allMdx
      if (!tags)
        return reporter.panicOnBuild('Error while running GraphQL query.')

      // @ts-ignore
      tags.forEach(({ fieldValue }: { fieldValue: any }) => {
        createPage({
          path: `/tag/${fieldValue.toLowerCase()}/`,
          component: path.resolve('src/templates/TagsTemplate/index.tsx'),
          context: {
            tag: fieldValue
          }
        })
      })
    })

const createArticlePages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter
}) =>
  graphql<CreateArticlePagesQuery>(`
    query CreateArticlePages {
      allMdx(filter: { frontmatter: { wip: { nin: true } } }) {
        edges {
          node {
            frontmatter {
              slug
              wip
            }
          }
        }
      }
    }
  `).then(result => {
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

    posts.forEach(
      ({
        node: {
          // @ts-ignore
          frontmatter: { slug }
        }
      }) => {
        createPage({
          path: `/blog/${slug.toLowerCase()}/`,
          component: path.resolve('src/templates/ArticleTemplate/index.tsx'),
          context: {
            slug
          }
        })
      }
    )
  })

exports.createPages = async (
  GatsbyNode: CreatePagesArgs & { traceId: 'initial-createPages' }
) => {
  const article = createArticlePages(GatsbyNode)
  const articleList = createArticleListPages(GatsbyNode)

  return Promise.all([article, articleList])
}
