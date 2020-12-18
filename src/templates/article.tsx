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
import { ArticlePostQuery } from '../../types/graphql-types'

type Props = {
  data: ArticlePostQuery
}

// 
const ArticlePost: React.FC<Props> = ({ data }) => {
  const articles = data.articles

  return (
    <Layout>
      <SEO title={articles.title} type="article" />
      <MDXProvider components={MDComponents}>
        <h2 id='article-title'>{articles?.title}</h2>
        <article id='article-body'>
          <MDXRenderer>{articles.body.child.body}</MDXRenderer>
        </article>
      </MDXProvider>
    </Layout>
  )
}

export default ArticlePost
//e7c7b004-2332-50e0-908c-0cd005d56469
export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }

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
