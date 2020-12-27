import { Link } from 'gatsby'
import React from 'react'

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
  date: string  | null | undefined,
}
const PublicationDate: React.FC<TimeProps> = ({ className, date }) => (
  <span className={className}>
    <time>{date}</time>
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
  date: string | null | undefined,
  slug: string  | null | undefined,
  title: string  | null | undefined,
  tags?: Array<TagsProps>  | null | undefined,
  category?: string  | null | undefined,
}
const Article: React.FC<ArticleProps> = ({ id, date, slug, title, tags, category }) => (
  <article className="article card-anim card" id={`post-${id}`} >
    <div className="article-wrapper">
      <div className="article-body">

        {/* Category */}
        {/* <Link 
          className="category"
          to={`/category/${category}`}>
            {category || 'React'}
        </Link> */}
        <Title 
          className="article-title"
          title={title}
          slug={slug}
        />
        <div className="article-descriptions">

          <div>
            <PublicationDate className="article-publication-date" date={date} />
            <Tags className="article-tags" data={tagsmock} />
          </div>

          {/* Readmore */}
          <Link to={`/blog/${slug}`}>
            <strong className="read-more">
              続きを読む
            </strong>
          </Link>

        </div>

      </div>
    </div>
  </article>
  )

export default Article