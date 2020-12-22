import { Link } from 'gatsby'
import React from 'react'

import useSiteMetadata from './SiteMetadata'

const Header: React.FC = () => {
  const { title } = useSiteMetadata()
  return (
    <header
      style={{
        background: 'rebeccapurple',
        marginBottom: '1.45rem',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/blog/1"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {title}
          </Link>
        </h1>
      </div>
    </header>
  )
}

export default Header
