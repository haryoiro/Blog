import React, { FC } from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import MDComponents from '../../components/MDXComponents'
import Layout from '../../components/layouts/TwoColumnsLayout'

import { ArticleBySlugQuery } from '../../../types/graphql-types'

export type Props = {
  data: ArticleBySlugQuery
}

const BlogBody: FC<Props> = ({ data }) => {
  const title = data.mdx?.frontmatter?.title
  return (
    <Layout title={title} type="article">
      <div className="card">
        <MDXProvider components={MDComponents}>
          <div className="mdx-wrapper">
            <h1>{title}</h1>
            <article>
              <MDXRenderer>{data.mdx?.body || ' '}</MDXRenderer>
            </article>
          </div>
        </MDXProvider>
      </div>
      <div>side</div>
    </Layout>
  )
}

export default BlogBody
