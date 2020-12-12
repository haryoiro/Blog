import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const Articles = ({ data }) => {
  return data.articles.edges.map(edge => {
    const articles = edge.node
    console.log(articles.title)
    return (
      <div key={articles.id}>
        <div>
          <Link to={`/article/${encodeURI(articles.title)}`}>
            <h2>{articles.title}</h2>
          </Link>
          {/* <p>{articles.features}</p> */}
        </div>
        <hr />
      </div>
    )
  })
}


const IndexPage = () => {
  const data = useStaticQuery(getAllArticles)
  return (
    <Layout>
      <SEO title="Articles" />
      <Articles data={data} />
    </Layout>
  )
}

const getAllArticles = graphql`
query getAllArticles {
  articles: allContentfulArticles(
    sort: {
      order: DESC,
      fields: [createdAt]
    }) {
    edges {
      node {
        id
        tags
        title
        createdAt
      }
    }
  }
}
`

export default IndexPage
