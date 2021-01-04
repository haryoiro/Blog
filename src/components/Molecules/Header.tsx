import { Link } from 'gatsby'
import React from 'react'
import Center from '../layouts/CenteringLayout'
import Logo from '../Atoms/SiteLogo'

import useSiteMetadata from '../SiteMetadata'

const Header: React.FC = () => {
  const { title } = useSiteMetadata()
  return (
    <header className="header grid-center">
      <Center>
        <Link to="/blog">
          <Logo />
        </Link>
      </Center>
    </header>
  )
}

export default Header
