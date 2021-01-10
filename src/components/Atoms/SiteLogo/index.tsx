import React, { FC } from 'react'
import { ReactComponent as Logo } from './SiteLogo.svg'

import './SiteLogo.scss'

type SiteLogoProps = {

}

const SiteLogo: FC<SiteLogoProps> = () => (
  <div className="siteLogo">
    <Logo />
  </div>
)

export { SiteLogoProps, SiteLogo as default }
