import React, { FC, ReactElement } from 'react'

import Styles from './TwoColumnLayout.module.scss'
import Grid, { GridPositions } from './CenteringLayout'

type TwoColumnLayoutProps = {
  className?: string | undefined,
  sidePosition?: GridPositions,
  children: [
    ReactElement, // head
    ReactElement, // main
    ReactElement, // side
    ReactElement, // foot
  ],
}

const TwoColumnLayout: FC<TwoColumnLayoutProps> = ({
  className,
  children,
  sidePosition = 'left',
}) => (
  <div className={className}>
    <div className={Styles.wrapper}>
      <div className={Styles.head}>{children[0]}</div>
      <Grid>
        <div className={Styles.main}>{children[1]}</div>
        <div className={Styles.side}>{children[2]}</div>
      </Grid>
      <div className={Styles.foot}>{children[3]}</div>
    </div>
  </div>
)

export default TwoColumnLayout
