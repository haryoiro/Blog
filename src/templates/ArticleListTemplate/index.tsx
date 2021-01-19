/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
// @ts-ignore
import { scale, rhythm } from '../../utils/typography'

import Layout from '../../components/layouts/TwoColumnsLayout'

import Svg from '../../components/Atoms/Svgs'
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
                slug, title, tags, category, createdAt,
              },
              excerpt,
            },
          }: any) => (
            <article key={`post-${slug}`} className="l-card c-card">
              <Link to={`/blog/${slug}`} className="c-logo">
                <Svg
                  svgName={category}
                  className="c-category"
                  width="80"
                  height="80"
                />
              </Link>
              <div className="c-body">
                <Link to={`/blog/${slug}`}>
                  <h2
                    className="c-title"
                    style={{
                      fontSize: scale(0.2).fontSize,
                      lineHeight: scale(0.2).lineHeight,
                      height: rhythm(0.2).height,
                    }}
                  >
                    {title}
                  </h2>
                </Link>
                <div className="c-tags">
                  <span className="c-createdAt">{createdAt}</span>
                  <Tags tags={tags} />
                </div>
                <p
                  className="c-description"
                  style={{
                    fontSize: '14px',
                    lineHeight: '17px',
                    height: rhythm(0).height,
                    marginBottom: 0,
                    fontWeight: 400,
                  }}
                >
                  {excerpt}
                </p>
              </div>
            </article>
          ))
        }
      </>
      <Sidebar title="autor" className="autor">
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
