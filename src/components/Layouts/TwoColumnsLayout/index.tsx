import React, { FC, ReactElement } from 'react'

import Header from '../../Elements/Header'
import Footer from '../../Elements/Footer'

import Center from '../CenterLayout'
import { SEOProps, SEO } from '../../SEO'

interface I2Layout {
  children: [
    ReactElement, // main
    ReactElement, // side
  ],
}

export type TwoColumnsLayoutProps = SEOProps & I2Layout

const TwoColumnsLayout: FC<TwoColumnsLayoutProps> = ({
  children, title, type,
}) => (
  <>
    <SEO title={title} type={type} />
    <div className="site-wrapper">
      <Header className="head grid-center shadowish" />
      <div className="body grid-center">
        <div className="body-wrapper">
          <main className="main" role="main">{children[0]}</main>
          <aside className="side">{children[1]}</aside>
        </div>
      </div>
      <Center className="foot is-grayishdark footer">
        <Footer />
      </Center>
    </div>
  </>
)

export default TwoColumnsLayout
