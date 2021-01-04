import React, { FC } from 'react'

import Styles from './TwoColumnLayout.module.scss'
import { GridPositions } from './GridVerticalLayout'

type TwoColumnLayoutProps = {
  className?: string | undefined,
  sidePosition?: GridPositions,
  children: React.ReactNode,
}

const TwoColumnLayout: FC<TwoColumnLayoutProps> = ({
  className,
  children,
  sidePosition = 'left',
}) => (
  <div className={className}>
    <div className={Styles.wrapper}>
      <div>
        {children}
      </div>
    </div>
  </div>
)

export default TwoColumnLayout
