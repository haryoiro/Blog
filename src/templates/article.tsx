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

import { ArticleBySlugQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleBySlugQuery
}

const ArticlePostTemplate: React.FC<Props> = ({
  data: { mdx },
}) => {
  const title = mdx?.frontmatter?.title
  return (
    <Layout title={title} type="article">
      <MDXProvider components={MDComponents}>
        <h2 className="article-title">{title}</h2>
        <article className="article-body">
          <MDXRenderer>{mdx?.body || ' '}</MDXRenderer>
        </article>
      </MDXProvider>
    </Layout>
  )
}

export default ArticlePostTemplate

export const ArticleBySlug = graphql`
query ArticleBySlug($slug: String) {
  mdx(frontmatter: {slug: {eq: $slug}}) {
    frontmatter {
      slug
      title
    }
    body
    parent {
      ... on File {
        createdAt: birthTime(formatString: "MMMM/DD/YY HH:MM")
        uppdatedAt: changeTime(fromNow: true)
      }
    }
  }
}

`

// article: contentfulArticles(slug: {eq: $slug}) {
//   slug
//   title
//   node: childContentfulArticlesBodyTextNode {
//     childMdx {
//       body
//     }
//   }

//   createdAt(formatString: "MMMM/DD/YY HH:MM")
//   updatedAt(fromNow: true)
// }