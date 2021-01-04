import React, { FC } from 'react'
import { ReactComponent as Logo } from './SiteLogo.svg'

type SiteLogoProps = {

}

const SiteLogo: FC<SiteLogoProps> = () => (
  <div>
    <Logo />
  </div>
)

export { SiteLogoProps, SiteLogo as default }