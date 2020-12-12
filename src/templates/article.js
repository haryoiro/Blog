import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"


import Layout from "../components/layout"

const ArticlePost = ({ data }) => {
    const articleData = data.contentfulArticles

    return (
      <Layout>
        <MDXProvider>
          <h1>{articleData.title}</h1>
          <article>
            <MDXRenderer>{articleData.body.childMdx.body}</MDXRenderer>
          </article>
        </MDXProvider>
      </Layout>
      )
}

export const query = graphql`
{
  contentfulArticles {
    body {
      childMdx {
        body
      }
    }
  }
}
`

export default ArticlePost
