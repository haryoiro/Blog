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

import Layout from '../components/Layout/Layout'
import MDComponents from '../components/MDXComponents'

// type declarations
import { ArticleBySlugQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleBySlugQuery
}

// 
const ArticlePostTemplate: React.FC<Props> = ({ data }) => {
  const title = data.article?.title
  const body = data.article?.node?.childMdx?.body

  return (
    <Layout title={title} type="article" >
      <MDXProvider components={MDComponents}>
        <h2 id='article-title'>{title}</h2>
        <article id='article-body'>
          <MDXRenderer>{body || ''}</MDXRenderer>
        </article>
      </MDXProvider>
    </Layout>
  )
}

export default ArticlePostTemplate

export const ArticleBySlug = graphql`
query ArticleBySlug($slug: String!) {
  article: contentfulArticles(slug: {eq: $slug}) {
    slug
    title
    node: childContentfulArticlesBodyTextNode {
      childMdx {
        body
      }
    }

    createdAt(formatString: "MMMM/DD/YY HH:MM")
    updatedAt(fromNow: true)
  }
}

`
