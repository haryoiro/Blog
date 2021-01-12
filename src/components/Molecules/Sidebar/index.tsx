import React from 'react'

import useSiteMetadata from '../../SiteMetadata'

const SideBar: React.FC = () => {
  const {
    author,
    description,
  } = useSiteMetadata()

  return (
    <div>
      <strong>{author}</strong>
      <p>{description}</p>
    </div>
  )
}

export default SideBar
