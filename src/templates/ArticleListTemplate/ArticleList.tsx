import { Link } from 'gatsby'
import React, { FC } from 'react'

import Tags from '../../components/Elements/Tags'
import { ArticleProps } from '../../../types/article'

const Article: FC<ArticleProps> = ({
  id,
  createdAt,
  slug,
  title,
  body,
  tags
}) => (
  <article key={`post-${id}`}>
    <Link to={`/blog/${slug}`} className="">
      <h2>{title}</h2>
    </Link>
    <span className="publicationData">
      <time>{createdAt}</time>
    </span>
    <Tags tags={tags} />
    <p>{body}</p>
  </article>
)

export default Article
