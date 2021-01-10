/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
import React, { FC } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layouts/TwoColumnsLayout'

import Svgs from '../../components/Atoms/Svgs'
import Tags from '../../components/Atoms/Tags'

// @ts-ignore
import { ArticleListByTagQuery } from '../../../types/graphql-types'

export type Props = {
  data: ArticleListByTagQuery,
  pageContext: any,
}

const TagsTemplate: FC<Props> = ({ data, pageContext }) => {
  const articles = data.allMdx.edges

  return (
    <Layout title={`${pageContext.tag}`} type="article">
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
            <article key={`post-${slug}`}>
              <Svgs svgName={category} className="card-logo" />
              <Link to={`/blog/${slug}`}>
                <h2>{title}</h2>
              </Link>
              <span className="publicationData">
                <time>{createdAt}</time>
              </span>
              <Tags tags={tags} />
              <p>{excerpt}</p>
            </article>
          ))
        }
      </>
      <div>side</div>
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
          createdAt: date(formatString: "YYYY-MM-DD")
          tags
          category
        }
        excerpt(pruneLength: 120)
      }
    }
  }
}`
