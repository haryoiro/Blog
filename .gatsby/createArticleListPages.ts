/**
 * PageCreator from gatsby-node.js
 * generate ArticleList Page
 * 
 * path: /blog/[n]
 */
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

const createArticleListPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
  reporter,
}) => graphql<Articles>(`
  query CreateArticleListPages {
    allContentfulArticles(
      limit: 1000,
      sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          slug
        }
      }
    }
  }`).then((result) => {
  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return;
  }

  // すべての記事
  const posts = result?.data?.allContentfulArticles.edges
  if (!posts) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return;
  }

  // 一覧ページで表示する記事の本数
  const postsPerPage = 6

  // 生成される記事一覧ページのページ数
  const numPages = Math.ceil(posts.length / postsPerPage)

  // 記事一覧ページの作成
  Array.from({ length: numPages }).forEach((_, i) => {
    // 配列のindexをもとにページ番号を割り当て。
    const pagePath = i === 0 ? '/blog' : `/blog/${i + 1}`
    createPage({
      path: pagePath,
      component: path.resolve('src/templates/articleList.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
})

module.exports = createArticleListPages