import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import BlogBody from '../components/BlogBody/BlogBody'

import { ArticleBySlugQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleBySlugQuery
}

const ArticleTemplate: FC<Props> = ({ data }) => <BlogBody data={data} />

export default ArticleTemplate

export const ArticleBySlug = graphql`
query ArticleBySlug($slug: String) {
  mdx(frontmatter: {slug: {eq: $slug}}) {
    frontmatter {
      slug
      title
      createdAt: date(formatString: "YYYY.MM.DD")
    }
    body
  }
}

`
