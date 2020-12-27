import { Link } from 'gatsby'
import React from 'react'

import useSiteMetadata from './SiteMetadata'

const Header: React.FC = () => {
  const { title } = useSiteMetadata()
  return (
    <header>
      <div>
        <h1 style={{ margin: 0 }}>
          <Link to="/blog">
            {title}
          </Link>
        </h1>
      </div>
    </header>
  )
}

export default Header
