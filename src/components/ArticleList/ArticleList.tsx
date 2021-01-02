import { Link } from 'gatsby'
import React from 'react'

import {
  GrCalendar as CreatedAtIcon,
} from 'react-icons/gr'

// =================================================================
// title
type TitleProps = {
  className: string,
  title: string | null | undefined,
  slug: string | null | undefined,
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
  createdAt: string | null | undefined,
}
const PublicationDate: React.FC<TimeProps> = ({ className, createdAt }) => (
  <span className={className}>
    <span className="in-icon">
      <CreatedAtIcon width="16px" height="16px" />
      <time>{createdAt}</time>
    </span>
  </span>
)

// =================================================================
// Tags
type TagsProps = {
  className: string,
  tags: Array<string> | null | undefined,
}
const Tags: React.FC<TagsProps> = ({ className, tags }) => (
  <span className={className}>
    {
    tags && tags.map((tag) => (
      <Link className="tag" to={`/tag/${tag}`} key={tag}>
        #
        {tag}
      </Link>
    ))
    }
  </span>
)

// =================================================================
// Article
type ArticleProps = {
  id?: string | null | undefined,
  createdAt?: string | null | undefined,
  slug?: string | null | undefined,
  title?: string | null | undefined,
  tags?: Array<string> | null | undefined,
  category?: string | null | undefined,
  body?: string | null | undefined
}

const Article: React.FC<ArticleProps> = ({
  id,
  createdAt,
  slug,
  title,
  body,
  tags,
}) => (
  <article className="article card" key={`post-${id}`}>
    <div className="article-wrapper">
      <div className="article-body">
        <Title
          className="article-title"
          title={title}
          slug={slug}
        />
        <PublicationDate
          className="article-publication-date"
          createdAt={createdAt}
        />
        <Tags
          className="article-tags"
          tags={tags}
        />
        <hr className="split" />
        <p className="article-main">
          {body}
        </p>
      </div>
    </div>
  </article>
)

export default Article
