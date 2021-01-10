import React, { FC } from 'react'
import { Link } from 'gatsby'

import { ArticleProps } from '../../../../types/article'

const Tags: FC<ArticleProps> = ({ className, tags }) => (
  <span className={className}>
    {
      tags && tags.map((tag) => (
        <Link to={`/tag/${tag}`} key={tag}>
          {tag}
        </Link>
      ))
    }
  </span>
)

export { Tags as default }
