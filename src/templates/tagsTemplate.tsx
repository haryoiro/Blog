/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC, ReactElement } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Article from '../components/ArticleList'
// @ts-ignore
import { ArticleListByTagQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleListByTagQuery,
  pageContext: any,
}

type ArticleNodeProps = {
  node : any
}

const TagsTemplate: FC<Props> = ({ data, pageContext }) => {
  const articles = data.allMdx.edges

  return (
    <Layout
      title={`${pageContext.tag}`}
      type="article"
      topic={`Tag: ${pageContext.tag}`}
    >
      <>
        {
        articles.map((
          {
            node:
            {
              frontmatter: {
                slug, title, tags, createdAt,
              },
              excerpt,
            },
          }: ArticleNodeProps,
        ): ReactElement => (
          <Article
            key={slug}
            id={slug}
            title={title}
            slug={slug}
            createdAt={createdAt}
            body={excerpt}
            tags={tags}
          />
        ))
      }
      </>
    </Layout>
  )
}

export default TagsTemplate

export const ArticleListByTag = graphql`
query ArticleListByTag($tag: String!) {
  allMdx(
    filter: {frontmatter: {tags: {eq: $tag}}},
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
        excerpt(pruneLength: 120)
      }
    }
  }
}`
