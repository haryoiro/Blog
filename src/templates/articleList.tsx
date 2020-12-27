import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout/Layout'
import Article from '../components/ArticleList/ArticleList'

import { ArticleListQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleListQuery,
  pageContext: any
}

const ArticleListTemplate: React.FC<Props> = ({ data, pageContext }) => {
  const articles = data.allContentfulArticles.edges

  return (
    <Layout title="記事一覧" type="website">
      {
        articles.map(({ node: { createdAt, slug, title } }) => (
          <Article id={slug} title={title} slug={slug} date={createdAt} />
        ))
      }
    </Layout>
  )
}

export default ArticleListTemplate

export const articleListQuery = graphql`
query ArticleList($skip: Int!, $limit: Int!) {
  allContentfulArticles(
    limit: $limit,
    skip: $skip,
    sort: {fields: createdAt, order: DESC}) {
    edges {
      node {
        id
        title
        slug
        updatedAt(fromNow: true)
        createdAt(formatString: "MMMM DD, YY")
        body {
          childMdx {
            excerpt(pruneLength: 154)
          }
        }
      }
    }
  }
}

`