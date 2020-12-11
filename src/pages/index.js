import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const Articles = ({ data }) => {
  return data.allMicrocmsArticles.edges.map(edge => {
    const articles = edge.node
    console.log(edge)
    return (
      <div key={articles.id}>
        <div>
          <Link to={`/article/${articles.title}`}>
            <h2>{articles.title}</h2>
          </Link>
          <p>{articles.features}</p>
        </div>
        <div>
          {articles.category.map(category => (
            <div key={category.id}>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
        <hr />
      </div>
    )
  })
}


const IndexPage = () => {
  const data = useStaticQuery(query)
  return (
    <Layout>
      <SEO title="Articles" />
      <Articles data={data} />
    </Layout>
  )
}

const query = graphql`
 {
    allMicrocmsArticles(
     sort: { fields: [createdAt], order: DESC }
   ) {
     edges {
       node {
         id
         title
         title_origin
         category {
           id
           name
         }
         body
         features
       }
     }
   }
 }
`
export default IndexPage
