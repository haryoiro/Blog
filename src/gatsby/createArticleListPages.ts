/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import path from 'path'
import { GatsbyNode } from 'gatsby'

// @ts-ignore
import { CreateArticleListPagesQuery } from '../../types/graphql-types'

const createArticleListPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => graphql<CreateArticleListPagesQuery>(`
  query CreateArticleListPages {
    allMdx(
      limit: 1000
    ) {
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
  }`).then((result) => {
  if (result.errors || !result.data) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  // すべての記事
  const posts = result.data.allMdx.edges
  if (!posts) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  // =================================================================
  // ArticleListPages
  // =================================================================

  // 記事の本数
  const postsPerPage = 6

  // ページ数
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    // 配列のindexをもとにページ番号を割り当て。
    const pagePath = i === 0 ? '/blog' : `/blog/${i + 1}`
    createPage({
      path: pagePath,
      component: path.resolve('src/templates/articleListTemplate.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // =================================================================
  // TagsPages
  // =================================================================
  const { tags } = result.data.allMdx
  if (!tags) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  // @ts-ignore
  tags.forEach(({ fieldValue }: { fieldValue: any }) => {
    createPage({
      path: `/tag/${fieldValue}`.toLowerCase(),
      component: path.resolve('src/templates/tagsTemplate.tsx'),
      context: {
        tag: fieldValue,
      },
    })
  })
})

module.exports = createArticleListPages
