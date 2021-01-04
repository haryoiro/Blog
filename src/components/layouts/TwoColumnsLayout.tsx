import React, { FC, ReactElement } from 'react'

import Styles from './TwoColumnsLayout.module.scss'
import Center from './CenteringLayout'

type TwoColumnsLayoutProps = {
  className?: string | undefined,
  children: [
    ReactElement, // head
    ReactElement, // main
    ReactElement, // side
    ReactElement, // foot
  ],
}

const TwoColumnsLayout: FC<TwoColumnsLayoutProps> = ({
  className = '',
  children,
}) => (
  <div className={Styles.wrapper.concat(className)}>
    <Center className="header">
      <div className={Styles.head}>{children[0]}</div>
    </Center>
    <Center>
      <div className={Styles.main}>{children[1]}</div>
      <div className={Styles.side}>{children[2]}</div>
    </Center>
    <Center>
      <div className={Styles.foot}>{children[3]}</div>
    </Center>
  </div>
)

export default TwoColumnsLayout
