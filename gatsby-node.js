const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
  {
    allContentfulArticles(
      limit: 1000,
      sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `)

  // GraphQLクエリ実行中エラー
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.')
    return
  }

  // すべての記事
  const posts = result.data.allContentfulArticles.edges

  // 一覧ページで表示する記事の本数
  const postsPerPage = 6

  // 生成される記事一覧ページのページ数
  const numPages = Math.ceil(posts.length / postsPerPage)

  // 記事一覧ページの作成
  Array.from({ length: numPages }).forEach((_, i) => {
    // 配列のindexをもとにページ番号を割り当て。
    const pagePath = i === 0 ? '/blog/1/' : `/blog/${i + 1}/`
    createPage({
      path: pagePath,
      component: path.resolve('./src/templates/articleList.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // それぞれの記事の詳細
  posts.forEach((edge) => {
    const pagePath = `/blog/${edge.node.slug}/`
    createPage({
      path: pagePath,
      component: path.resolve('./src/templates/article.tsx'),
      context: {
        slug: edge.node.slug,
      },
    })
  })
}
