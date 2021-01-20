/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
// @ts-ignore
import { scale, rhythm } from '../../utils/typography'
import Layout from '../../components/ayouts/TwoColumnsLayout'

import Svgs from '../../components/Atoms/Svgs'
import Tags from '../../components/Atoms/Tags'
import Sidebar from '../../components/Elements/Sidebar'

// @ts-ignore
import { ArticleListByTagQuery } from '../../../types/graphql-types'

export type Props = {
  data: ArticleListByTagQuery,
  pageContext: any,
}

const TagsTemplate: FC<Props> = ({ data, pageContext }) => {
  const articles = data.allMdx.edges
  const articleCount = data.allMdx.totalCount

  return (
    <Layout title={`${pageContext.tag}`} type="article">
      <>
        <div className="l-card-crown spacebetween">
          <span>
            Tag
            {pageContext.tag.toUpperCase()}
          </span>
          <span>
            {articleCount}
            Articles
          </span>
        </div>
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
              <Link to={`/blog/${slug}`}>
                <div className="c-logo">
                  <Svgs
                    svgName={category}
                    className="c-category"
                    width="80"
                    height="80"
                  />
                </div>
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
                    fontWeight: 500,
                  }}
                >
                  {excerpt}
                </p>
              </div>
            </article>
          ))
        }
      </>
      <Sidebar title="author" className="author">
        side
      </Sidebar>
    </Layout>
  )
}

export default TagsTemplate

export const ArticleListByTag = graphql`
query ArticleListByTag($tag: String!) {
  allMdx(
    filter: {frontmatter: {tags: {eq: $tag}, wip: {nin: true}}},
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
    totalCount
  }
}`
