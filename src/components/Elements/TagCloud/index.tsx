import React, { FC } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

interface ITagCloud {
  className?: string | null | undefined,
}

const TagCloud: FC<ITagCloud> = ({ className }) => {
  const { allMdx: { tags } } = useStaticQuery(graphql`
    query {
      allMdx(limit: 1000, filter: {frontmatter: {wip: {}, title: {}}}) {
        tags: group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }`
  )
  return (
    <div className={`tags-wrapper c-card ${className || ''}`}>
      <div>Tags</div>
      {tags && tags.map(({ tag }: { tag: string }) => (
        <span className="item">
          <a href={`/tag/${tag}/`}>
            {/* text-transformが効くようにスペースを挿入する */}
            {' ' + tag + ' '}
          </a>
        </span>
      ))}
    </div>
  )
}

export default TagCloud
