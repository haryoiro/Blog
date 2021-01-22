import React, { FC } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

interface ITagCloud {
  className?: string | null | undefined,
}

const TagCloud: FC<ITagCloud> = ({ className }) => {
  const { allMdx: { tags } } = useStaticQuery(graphql`
    query {
      allMdx(limit: 1000, filter: {frontmatter: {wip: {nin: true}, title: {}}}) {
        tags: group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }`)

  return (
    <div className={`c-card ${className || ''}`}>
      <div className="sidecontent-header">
        Tags
      </div>
      <div className="tags-wrapper">
        {tags && tags.map(({ tag }: { tag: string }) => (
          <span className="item" key={tag}>
            <a href={`/tag/${tag}/`} className="tag">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </a>
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagCloud
