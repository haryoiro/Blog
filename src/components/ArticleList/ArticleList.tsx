import { Link } from 'gatsby'
import React from 'react'

import {
  GrHistory as UpdatedAtIcon,
  GrCalendar as CreatedAtIcon,
} from 'react-icons/gr'
import { FiChevronsRight } from "react-icons/fi";

import './ArticleList.scss'

const tagsmock = [
  {
    title: 'Docker',
    slug: 'docker',
  },
  {
    title: 'TypeScript',
    slug: 'typescript',
  }
]

// =================================================================
// title
type TitleProps = {
  className: string,
  title: string  | null | undefined,
  slug:  string  | null | undefined,
}
const Title: React.FC<TitleProps> = ({ className, title, slug }) => (
  <Link to={`/blog/${slug}`}>
    <h2 className={className}>
      {title}
    </h2>
  </Link>
)



// =================================================================
// Time
type TimeProps = {
  className: string,
  updatedAt: string  | null | undefined,
  createdAt: string | null | undefined,
}
const PublicationDate: React.FC<TimeProps> = ({ className, updatedAt, createdAt }) => (
  <span className={className}>
    <span className="in-icon"><CreatedAtIcon width="16px" height="16px" /><time>{createdAt}</time></span>
    <span className="in-icon"><UpdatedAtIcon width="16px" height="16px" /><time>{updatedAt}</time></span>
  </span>
)



// =================================================================
// Tags
type TagsProps = {
  className: string,
  data: Array<{
    slug: string,
    title: string,
  }>
}
const Tags: React.FC<TagsProps> = ({ className, data }) => (
  <span className={className}>
    {
    data.map(({ slug, title }) => (
      <Link className="tag" to={`/tags/${slug}`}>#{title}</Link>
    ))
    }
  </span>
)



// =================================================================
// Article
type ArticleProps = {
  id: string  | null | undefined,
  createdAt: string | null | undefined,
  updatedAt: string | null | undefined,
  slug: string  | null | undefined,
  title: string  | null | undefined,
  tags?: Array<TagsProps>  | null | undefined,
  category?: string  | null | undefined,
  body: any
}
const Article: React.FC<ArticleProps> = ({ id, createdAt, updatedAt, slug, title, tags, category, body: {childMdx: { excerpt }} }) => (
  <article className="article card" key={`post-${id}`} >
    <div className="article-wrapper">
      <div className="article-body">

        <Title 
          className="article-title"
          title={title}
          slug={slug}
        />
        <Tags 
          className="article-tags" 
          data={tagsmock} 
        />
        <hr className="split"/>
        <p className="article-main">
          {excerpt}
        </p>
        <div className="article-descriptions">
          <PublicationDate 
            className="article-publication-date"
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
          {/* Readmore */}
          <Link to={`/blog/${slug}`}>
            <span className="read-more grad">
              続きを読む
              <FiChevronsRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  </article>
  )

export default Article