import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

import { AllArticlesQuery } from '../../types/graphql-types'

type Props = {
  data: AllArticlesQuery
}


const ArticlesListPage = () => {
  const { allArticles: { articles } } = useStaticQuery<AllArticlesQuery>(query)

  return (
    <Layout>
      <SEO 
        title="All articles"
        type="website"
      />
      {
        articles.map(({ article: { id, updatedAt, slug, title } }) => (
          <div key={id}>

            <h5>{updatedAt}</h5>
            <Link to={`/blog/${slug}`}>
              <h2>{title}</h2>
            </Link>

            <Link to={`/blog/${slug}`}>続きを読む</Link>

          </div>
        )
        )
      }
    </Layout>
  )
}


export default ArticlesListPage

export const query = graphql`
query AllArticles {
	allArticles: allContentfulArticles(sort: {
    fields: updatedAt,
    order: DESC
  }) {
    articles: edges {
      article: node {
        id
        title
        slug
        updatedAt(fromNow: true)
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
