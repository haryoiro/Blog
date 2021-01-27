import React, { FC } from 'react'
import { Link } from 'gatsby'

import { MdxFrontmatter } from '../../../../types/graphql-types'

type TagsProps = Pick<MdxFrontmatter, 'tags'> & JSX.IntrinsicElements['span']

const Tags: FC<TagsProps> = ({ className, tags }) => (
  <span className={className}>
    {tags &&
      tags.map(tag => (
        <Link className="tag" to={`/tag/${tag?.toLowerCase()}/`} key={tag}>
          {tag && tag.charAt(0).toUpperCase() + tag.slice(1)}
        </Link>
      ))}
  </span>
)

export { Tags as default }
