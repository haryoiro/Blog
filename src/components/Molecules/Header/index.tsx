import { Link } from 'gatsby'
import React from 'react'
import Center from '../../layouts/CenterLayout'
import Logo from '../../Atoms/SiteLogo'

const Header: React.FC = () => (
  <header className="header grid-center">
    <Center>
      <Link to="/blog">
        <Logo />
      </Link>
    </Center>
  </header>
)

export default Header
