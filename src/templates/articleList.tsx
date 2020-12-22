import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { ArticleListQuery } from '../../types/graphql-types'

type Props = {
  data: ArticleListQuery,
  pageContext: any
}

const ArticleList: React.FC<Props> = ({ data, pageContext }) => {
  const articles = data.allContentfulArticles.edges

  console.log(pageContext)

  return (
    <Layout>
      <SEO title='Articles' type="article" />
      <div>
      {
        articles.map(({ node: { updatedAt, slug, title } }) => (
          <div key={slug}>

            <h5>{updatedAt}</h5>
            <Link to={`/blog/${slug}`}>
              <h2>{title}</h2>
            </Link>

            <Link to={`/blog/${slug}`}>続きを読む</Link>

          </div>
        )
        )
      }
      </div>
    </Layout>
  )
}

export default ArticleList

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
        createdAt(formatString: "MMMM/DD/YY HH:MM")
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