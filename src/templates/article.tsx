/**
 * 記事ページを作成するテンプレート
 * 
 * gatsby-node.js内の`createPage`でこのページが指定されると
 * ページが動的に作成される。
 */

import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../components/layout'
import SEO from '../components/seo'

// type declarations
import { ArticlePostQuery } from '../../types/graphql-types'

type Props = {
  data: ArticlePostQuery
}

// MDX Custom Components
const components = {
  h1: props => <h1 style={{color: "tomato"}} {...props} />,
  h2: props => <h2 style={{color: "limegreen"}} {...props} />,
}

// 
const ArticlePost: React.FC<Props> = ({ data }) => {
  const articleData = data.articles
  // console.log(articleData)

  return (
    <Layout>
      <SEO title={articleData.title} />
      <MDXProvider components={components}>
        <h1>{articleData.title}</h1>
        <article>
          <MDXRenderer>{articleData.body.child.body}</MDXRenderer>
        </article>
      </MDXProvider>
    </Layout>
  )
}

export default ArticlePost

export const query = graphql`
  query ArticlePost($id: String!) {
    articles: contentfulArticles(id: { eq: $id }) {
      id
      slug
      title
      features
      tags
      createdAt
      body: childContentfulArticlesBodyTextNode {
        child: childMdx {
          body
          text: excerpt
        }
      }
    }
  }
`
