import React, { FC } from 'react'
import { Link } from 'gatsby'

import { ArticleProps } from '../../../../types/article'

const Tags: FC<ArticleProps> = ({ className, tags }) => (
  <div className={className}>
    {
      tags && tags.map((tag) => (
        <span key={tag}>
          <Link className="tag" to={`/tag/${tag}/`}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </Link>
        </span>
      ))
    }
  </div>
)

export { Tags as default }
