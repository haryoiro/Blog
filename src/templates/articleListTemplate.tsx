/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import Article from '../components/ArticleList/ArticleList'

import { ArticleListQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleListQuery,
}
const ArticleListTemplate: FC<Props> = ({ data }) => {
  const articles = data.allMdx.edges

  return (
    <Layout
      title="記事一覧"
      type="website"
      topic="Blog"
    >
      {
        articles.map(({ node }: { node: any }): React.ReactElement => {
          const {
            frontmatter,
            excerpt,
          } = node
          return (
            <Article
              key={frontmatter?.slug}
              id={frontmatter?.slug}
              title={frontmatter?.title}
              slug={frontmatter?.slug}
              createdAt={frontmatter?.createdAt}
              tags={frontmatter?.tags}
              body={excerpt}
            />
          )
        })
      }
    </Layout>
  )
}

export default ArticleListTemplate

export const articleListQuery = graphql`
query ArticleList($skip: Int!, $limit: Int!) {
  allMdx(
    filter: {
      frontmatter: {title: {nin: ""}}},
      skip: $skip,
      limit: $limit,
      sort: {fields: frontmatter___date, order: DESC}
  ) {
    edges {
      node {
        frontmatter {
          slug
          title
          createdAt: date(formatString: "YYYY.MM.DD")
          tags
        }
        excerpt(pruneLength: 67)
      }
    }
  }
}
`
