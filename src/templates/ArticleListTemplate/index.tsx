/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
// @ts-ignorec
import Layout from '../../components/Layouts/TwoColumnsLayout'

import Tags from '../../components/Elements/Tags'
import Sidebar from '../../components/Elements/Sidebar'
import TagCloud from '../../components/Elements/TagCloud'
import {
  Pagination,
  PaginationProps
} from '../../components/Elements/Pagination'

import { ArticleListQuery } from '../../../types/graphql-types'

export type Props = {
  data: ArticleListQuery
  pageContext: PaginationProps
}

export type HeadProps = {
  title: string
}

const ArticleListHeader: FC<HeadProps> = ({ title }) => {
  return (
    <header className="ArticlesHeader c-body">
      <main className=""></main>
    </header>
  )
}

const ArticleListTemplate: FC<Props> = ({ data, pageContext }) => {
  const articles = data.allMdx.edges
  const { numPages, currentPage } = pageContext

  return (
    <Layout title="記事一覧" type="website">
      <>
        <ArticleListHeader title="Recent Posts" />
        {articles.map(
          ({
            node: {
              frontmatter: { slug, title, tags, createdAt },
              excerpt
            }
          }: any) => (
            <article key={`post-${slug}`} className="l-card c-card">
              <div className="c-body">
                <Link to={`/blog/${slug}`}>
                  <h2 className="c-title">{title}</h2>
                </Link>
                <div className="c-tags spacebetween">
                  <Tags tags={tags} />
                  <div className="c-createdAt">{createdAt}</div>
                </div>
                <Link to={`/blog/${slug}`}>
                  <div className="c-description shadow">{excerpt}</div>
                  <div className="c-detail">Read More &gt;&gt;</div>
                </Link>
              </div>
            </article>
          )
        )}
        <Pagination numPages={numPages} currentPage={currentPage} />
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
      filter: { frontmatter: { wip: { nin: true }, title: { nin: "" } } }
      skip: $skip
      limit: $limit
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        slug
      }
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
