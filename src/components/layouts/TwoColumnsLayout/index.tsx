import React, { FC, ReactElement } from 'react'

import Styles from './TwoColumnsLayout.module.scss'
import Center from '../CenterLayout'

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
      <div className="head">{children[0]}</div>
    </Center>
    <Center>
      <div className="main">{children[1]}</div>
      <div className="side">{children[2]}</div>
    </Center>
    <Center>
      <div className="foot">{children[3]}</div>
    </Center>
  </div>
)

export default TwoColumnsLayout
