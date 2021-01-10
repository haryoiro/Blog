import React, { FC, ReactElement } from 'react'

import Header from '../../Molecules/Header'
import Footer from '../../Molecules/Footer'

import Center from '../CenterLayout'
import { SEOProps, SEO } from '../../SEO'

interface I2Layout {
  children: [
    ReactElement, // main
    ReactElement, // side
  ],
}

type TwoColumnsLayoutProps = SEOProps & I2Layout

const TwoColumnsLayout: FC<TwoColumnsLayoutProps> = ({
  children, title, type,
}) => (
  <>
    <SEO title={title} type={type} />
    <div className="wrapper">
      <Center className="is-blue" inClassName="header">
        <Header className="head md" />
      </Center>
      <Center>
        <main className="main md">{children[0]}</main>
        <aside className="side md">{children[1]}</aside>
      </Center>
      <Center>
        <Footer className="foot md" />
      </Center>
    </div>
  </>
)

export default TwoColumnsLayout
