import React, { FC, ReactElement, Fragment } from 'react'

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
  <Fragment>
    <SEO title={title} type={type} />
    <div className="site-wrapper">
      <div className="is-blue_str">
        <Center className="head">
          <Header className="header" />
        </Center>
      </div>
      <Center className="l-center">
        <div className="body-wrapper">
          <main className="main">{children[0]}</main>
          <aside className="side">{children[1]}</aside>
        </div>
      </Center>
      <Center className="foot is-grayishdark footer">
        <Footer />
      </Center>
    </div>
  </Fragment>
)

export default TwoColumnsLayout
