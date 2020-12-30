/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout/Layout'
import Article from '../components/ArticleList/ArticleList'

import { ArticleListQuery } from '../../types/graphql-types'

export type Props = {
  data: ArticleListQuery,
}

const ArticleListTemplate: React.FC<Props> = ({ data }) => {
  const articles = data.allContentfulArticles.edges
  const mdxes = data.allMdx.edges
  
  return (
    <Layout title="記事一覧" type="website">
      {
        /* eslint-disable-next-line react/prop-types */
        articles.map(({
          node: {
            /* @ts-ignore */
            updatedAt, createdAt, slug, title, body,
          },
        }) => (
          /* @ts-ignore */
          <Article
            id={slug}
            title={title}
            slug={slug}
            createdAt={createdAt}
            body={body}
            updatedAt={updatedAt}
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
      sort: {fields: frontmatter___slug, order: DESC}
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
        excerpt(truncate: true, pruneLength: 64)
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
// AllMdx(
//   limit: $limit,
//   skip: $skip
// ) {
//   edges: {
//     node: {
//       frontmatter {
//         slug
//         title
//       }
//       parent {
//         ... on File {
//           createdAt: birthTime(formatString: "MMMM/DD/YY HH:MM")
//           uppdatedAt: changeTime(fromNow: true)
//         }
//       }
//     }
//   }
// }
