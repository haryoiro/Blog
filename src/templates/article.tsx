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
import MDComponent from '../components/mdcomponents'

// type declarations
import { ArticlePostQuery } from '../../types/graphql-types'

type Props = {
  data: ArticlePostQuery
}

// 
const ArticlePost: React.FC<Props> = ({ data }) => {
  const { articles } = data

  return (
    <Layout>
      <SEO title={articles?.title} />
      <MDXProvider components={components}>
        <h2 id='article-title'>{articles?.title}</h2>
        <article id='article-body'>
          <MDXRenderer>{articles?.body?.child?.body}</MDXRenderer>
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
      createdAt(fromNow: true)
      body: childContentfulArticlesBodyTextNode {
        child: childMdx {
          body
          text: excerpt
        }
      }
    }
  }
`
