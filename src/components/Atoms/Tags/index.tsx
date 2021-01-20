import React, { FC } from 'react'
import { Link } from 'gatsby'

import { ArticleProps } from '../../../../types/article'

const Tags: FC<ArticleProps> = ({ className, tags, style }) => (
  <span className={className}>
    {
      tags && tags.map((tag) => (
        <Link to={`/tag/${tag}`} key={tag} style={style}>
          <span className="tag">{tag + ' '}</span>
        </Link>
      ))
    }
  </span>
)

export { Tags as default }
