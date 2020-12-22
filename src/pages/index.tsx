import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'


const ArticlesListPage = () => {

  return (
    <Layout>
      <SEO 
        title="All articles"
        type="website"
      />
      <Link to='/blog/'>HOME</Link>
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
