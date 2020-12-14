import React from 'react'
import { PageProps, graphql, useStaticQuery, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import TAG from '../components/tag'

import { AllArticlesQuery } from '../../types/graphql-types'

type Props = {
  data: AllArticlesQuery
}

const Articles: React.FC<Props> = ({ data }) => {
  return (
    <>{
      data.articles.edges.map((edge) => {
      const articles = edge.node
      return (
        <div key={articles.id}>
          <div>
            <h5>posted at {articles.createdAt}</h5>
            <Link to={`/article/${articles.slug}`}>
              <h2>{articles.title}</h2>
            </Link>
            <p>{articles.features}</p>
            <>
            {articles.tags && articles.tags.map((tag) => (
              <TAG key={tag?.name} {...tag} />
            ))}
            </>
          </div>
        </div>
      )
    })
    }
  </>)
}

const ArticlesPage = () => {
  const data = useStaticQuery(query)

  return (
    <Layout>
      <SEO title="Articles" />
      <Articles data={data} />
    </Layout>
  )
}

export default ArticlesPage

export const query = graphql`
  query AllArticles {
    articles: allContentfulArticles(
      sort: { 
        order: DESC, 
        fields: [createdAt]
      }
    ) {
      edges {
        node {
          id
          tags
          title
          slug
          createdAt(fromNow: true)
          features
        }
      }
    }
  }
`
