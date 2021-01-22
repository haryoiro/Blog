/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../../components/Layouts/TwoColumnsLayout'

import Tags from '../../components/Atoms/Tags'
import Sidebar from '../../components/Elements/Sidebar'
import TagCloud from '../../components/Elements/TagCloud'

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
                slug, title, tags, createdAt,
              },
              excerpt,
            },
          }: any) => (
            <article key={`post-${slug}`} className="l-card c-card">
              <Link to={`/blog/${slug}`}>
                <div className="c-body">
                  <h2 className="c-title">
                    {title}
                  </h2>
                  <div className="c-tags">
                    <span className="c-createdAt">{createdAt}</span>
                    <Tags tags={tags} />
                  </div>
                  <p className="c-description">
                    {excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))
        }
      </>
      <Sidebar>
        <TagCloud />
      </Sidebar>
    </Layout>
  )
}

export default ArticleListTemplate

export const articleListQuery = graphql`
query ArticleList($skip: Int!, $limit: Int!) {
  allMdx(
    filter: {frontmatter: {wip: {nin: true}, title: {nin: ""}}},
    skip: $skip,
    limit: $limit,
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    edges {
      node {
        frontmatter {
          slug
          title
          createdAt: date(formatString: "MMMM DD, YYYY")
          tags
          category
        }
        excerpt(pruneLength: 120)
      }
    }
  }
}
`
