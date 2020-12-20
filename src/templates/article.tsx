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

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import MDComponents from '../components/MDXComponents'

// type declarations
import { ArticleBySlugQuery } from '../../types/graphql-types'

type Props = {
  data: ArticleBySlugQuery
}

// 
const ArticlePost: React.FC<Props> = ({ data }) => {
  const { article: {
    title,
    node: { childMdx: { 
      body
    } }
  }} = data

  return (
    <Layout>
      <SEO title={title} type="article" />
      <MDXProvider components={MDComponents}>
        <h2 id='article-title'>{title}</h2>
        <article id='article-body'>
          <MDXRenderer>{body}</MDXRenderer>
        </article>
      </MDXProvider>
    </Layout>
  )
}

export default ArticlePost

export const query = graphql`
query ArticleBySlug($slug: String!) {
  site {
    siteMetadata {
      title
      author
    }
  }
  article: contentfulArticles(slug: {eq: $slug}) {
    slug
    title

    createdAt(formatString: "MMMM/DD/YY HH:MM")
    node: childContentfulArticlesBodyTextNode {
      childMdx {
        body
      }
    }
    updatedAt(fromNow: true)
  }
}

`
