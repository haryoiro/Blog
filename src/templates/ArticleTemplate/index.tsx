/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import MDComponents from './MDXComponents'
// @ts-ignore
import Layout from '../../components/Layouts/TwoColumnsLayout'
import Sidebar from '../../components/Elements/Sidebar'
import Toc from '../../components/Elements/Toc'
import TagCloud from '../../components/Elements/TagCloud'
import Tags from '../../components/Elements/Tags'

import {
  ArticleBySlugQuery,
  MdxFrontmatter
} from '../../../types/graphql-types'

export type Props = {
  data: ArticleBySlugQuery
}

const ArticleHeader: FC<
  Pick<MdxFrontmatter, 'title' | 'tags'> & { createdAt: MdxFrontmatter['date'] }
> = ({ title, createdAt, tags }) => (
  <>
    <h2 className="title">{title}</h2>
    <div className="desc-wrapper">
      <div className="icon"> </div>
      <div className="desc">
        <div className="data">Published on {createdAt}</div>
        <div className="category">
          <Tags tags={tags} />
        </div>
      </div>
    </div>
  </>
)

const ArticleTemplate: FC<Props> = ({ data }) => {
  const title = data.mdx?.frontmatter?.title
  const body = data.mdx?.body
  const toc = data.mdx?.tableOfContents
  const createdAt = data.mdx?.frontmatter?.createdAt
  const tags = data.mdx?.frontmatter?.tags
  return (
    <MDXProvider components={MDComponents}>
      <Layout title={title} type="article">
        <div className="mdx-wrapper" role="article">
          <article className="c-card">
            <div className="mdx-header">
              <ArticleHeader
                title={title || ''}
                createdAt={createdAt}
                tags={tags}
              />
            </div>
            <Toc title="目次" data={toc} className="inner-toc" />
            <div className="mdx-body">
              <MDXRenderer>{body || ''}</MDXRenderer>
            </div>
          </article>
        </div>
        <Sidebar>
          <Toc title="Index" data={toc} className="is-pc outer-toc" />
          <TagCloud className="border" />
        </Sidebar>
      </Layout>
    </MDXProvider>
  )
}

export default ArticleTemplate

export const ArticleBySlug = graphql`
  query ArticleBySlug($slug: String) {
    mdx(frontmatter: { slug: { eq: $slug }, wip: { nin: true } }) {
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
