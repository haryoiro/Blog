import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import Article from '../components/ArticleList/ArticleList'

import { ArticleListQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleListQuery,
}

const ArticleListTemplate: React.FC<Props> = ({ data }) => {
  const articles = data.allMdx.edges

  return (
    <Layout title="記事一覧" type="website">
      {
        articles.map(({
          node: {
            frontmatter,
            parent,
            excerpt,
          },
        }) => (
          /* @ts-ignore */
          <Article
            id={frontmatter?.slug}
            title={frontmatter?.title || 'none'}
            slug={frontmatter?.slug || 'none'}
            createdAt={parent?.birthTime || 'none'}
            body={excerpt}
            updatedAt={parent?.changeTime || 'none'}
          />
        ))
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
        }
        parent {
          ... on File {
            name
            birthTime
            changeTime
          }
        }
        excerpt(pruneLength: 64)
      }
    }
  }
  allContentfulArticles(
    limit: $limit,
    skip: $skip,
    sort: {fields: createdAt, order: DESC}) {
    edges {
      node {
        id
        title
        slug
        updatedAt(fromNow: true)
        createdAt(formatString: "MMMM DD, YY")
        body {
          childMdx {
            excerpt(pruneLength: 64)
          }
        }
      }
    }
  }
}

`