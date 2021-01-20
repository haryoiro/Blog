/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import MDComponents from './MDXComponents'
import Layout from '../../components/Layouts/TwoColumnsLayout'
import Sidebar from '../../components/Elements/Sidebar'
import Toc from '../../components/Elements/Toc'
import TagCloud from '../../components/Elements/TagCloud'

import { ArticleBySlugQuery } from '../../../types/graphql-types'

export type Props = {
  data: ArticleBySlugQuery
}

const ArticleTemplate: FC<Props> = ({ data }) => {
  const title = data.mdx?.frontmatter?.title
  const body = data.mdx?.body
  const toc = data.mdx?.tableOfContents
  const createdAt = data.mdx?.frontmatter?.createdAt
  return (
    <MDXProvider components={MDComponents}>
      <Layout title={title} type="article">
        <div className="mdx-wrapper">
          <article className="c-card">
            <div className="mdx-header">
              <div className="c-a-title">{title}</div>
              <div className="c-a-desc">{createdAt}</div>
            </div>
            <Toc
              title="このページには以下の内容が含まれます："
              data={toc}
              className="is-mobile inner-toc"
            />
            <MDXRenderer>{body || ''}</MDXRenderer>
          </article>
        </div>
        <Sidebar title="Contents">
          <Toc
            title="Contents"
            data={toc}
            className="is-pc outer-toc"
          />
          <TagCloud />
        </Sidebar>
      </Layout>
    </MDXProvider>
  )
}

export default ArticleTemplate

export const ArticleBySlug = graphql`
query ArticleBySlug($slug: String) {
  mdx(frontmatter: {slug: {eq: $slug}, wip: {nin: true}}) {
    frontmatter {
      slug
      title
      createdAt: date(formatString: "MMMM DD, YYYY")
      tags
      category
    }
    body
    tableOfContents(maxDepth: 3)
  }
}
`
