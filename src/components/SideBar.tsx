import { Link } from 'gatsby'
import React from 'react'

import useSiteMetadata from './SiteMetadata'

const SideBar: React.FC = () => {
  const {
    author,
    description,
  } = useSiteMetadata()

  return (
    <div className="sidebar card">
      <div className="article-wrapper">
        <strong>{author}</strong>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default SideBar
