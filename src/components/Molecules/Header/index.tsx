import { Link } from 'gatsby'
import React, { FC } from 'react'
import { ReactComponent as Logo } from './SiteLogo.svg'

interface IHead {
  className: string
}

type HeadProps = Partial<IHead>

const Header: FC<HeadProps> = ({ className }) => (
  <div className={`header ${className || ''}`}>
    <Link to="/blog" className="siteLogo">
      <Logo />
    </Link>
  </div>
)

export default Header
