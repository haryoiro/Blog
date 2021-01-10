import { Link } from 'gatsby'
import React, { FC } from 'react'

import Svg from '../../components/Atoms/Svgs'
import Tags from '../../components/Atoms/Tags'
import { ArticleProps } from '../../../types/article'

const Article: FC<ArticleProps> = ({
  id,
  createdAt,
  slug,
  title,
  body,
  tags,
  category,
}) => (
  <article key={`post-${id}`}>
    <Svg
      width="99"
      height="99"
      svgName={category}
      className="card-logo"
    />
    <Link to={`/blog/${slug}`}>
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
