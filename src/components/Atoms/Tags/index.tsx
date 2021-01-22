import React, { FC } from 'react'
import { Link } from 'gatsby'

import { ArticleProps } from '../../../../types/article'

const Tags: FC<ArticleProps> = ({ className, tags, style }) => (
  <span className={className}>
    {
      tags && tags.map((tag) => (
        <span>
          <Link className="tag" to={`/tag/${tag}`} key={tag} style={style}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </Link>
        </span>
      ))
    }
  </span>
)

export { Tags as default }
