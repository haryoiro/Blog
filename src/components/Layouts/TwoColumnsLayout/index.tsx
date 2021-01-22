import React, { FC, ReactElement } from 'react'

import Header from '../../Elements/Header'
import Footer from '../../Elements/Footer'

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
    <div className="site-color" />
    <div className="site-wrapper">
      <Header className="head grid-center" />
      <div className="body">
        <div className=" grid-center body-wrapper">
          <main className="main" role="main">{children[0]}</main>
          <aside className="side">{children[1]}</aside>
        </div>
      </div>
      <Footer className="foot grid-center footer" />
    </div>
  </>
)

export default TwoColumnsLayout
