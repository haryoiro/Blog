import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const getBlogPostList = graphql`
  query getBlogPost {
    allContentfulPost {
      nodes {
        id
        title
        body {
          raw
        }
        user
      }
    }
  }`


const BlogPost = ({ id, title, body, user }) => (
  <div>
    <h1>{title}</h1>
    <h5>{user}</h5>
    {/* <p>{body}</p> */}
  </div>
)

const BlogPosts = ({ data }) => {
  const blogNodes = data.allContentfulPost.nodes
  return blogNodes.map((props) => (
    <BlogPost key={props.id} {...props} />
  ))
} 

const IndexPage = () => {
  const data = useStaticQuery(getBlogPostList)
  return (
  <Layout>
    <SEO title="Home" />
    <BlogPosts data={data} />
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
  )
}

export default IndexPage
