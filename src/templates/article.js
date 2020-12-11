import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const ArticlePost = props => {
    const post = props.data.microcmsArticles

    return (
        <Layout>
          <div>
            <h2>{post.title}</h2>
            <h3>原文：{post.title_origin}</h3>
            <br />
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.body}`,
              }}
            ></p>
          </div>
        </Layout>
      )
}

export const query = graphql`
 query($id: String!) {
   microcmsArticles(id: { eq: $id }) {
     title
     title_origin
     body
     body
   }
 }
`

export default ArticlePost
