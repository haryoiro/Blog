/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layouts/TwoColumnsLayout'

import Svg from '../../components/Atoms/Svgs'
import Tags from '../../components/Atoms/Tags'

import { ArticleListQuery } from '../../../types/graphql-types'

export type Props = {
  data: ArticleListQuery,
}

const ArticleListTemplate: FC<Props> = ({ data }) => {
  const articles = data.allMdx.edges

  return (
    <Layout title="記事一覧" type="website">
      <>
        {
          articles.map(({
            node: {
              frontmatter: {
                slug, title, tags, category, createdAt,
              },
              excerpt,
            },
          }: any) => (
            <article key={`post-${slug}`} className="l-card">
              <div className="c-logo">
                <Svg svgName={category} className="c-category" />
              </div>
              <div className="c-body">
                <time className="c-createdAt">{createdAt}</time>
                <Link to={`/blog/${slug}`}><h2>{title}</h2></Link>
                <Tags className="c-tags" tags={tags} />
                <p>{excerpt}</p>
              </div>
            </article>
          ))
        }
      </>
      <div>side</div>
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
          createdAt: date(formatString: "YYYY-MM-DD")
          tags
          category
        }
        excerpt(pruneLength: 67)
      }
    }
  }
}
`
