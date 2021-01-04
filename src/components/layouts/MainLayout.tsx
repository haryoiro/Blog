import React, { FC, ReactElement } from 'react'

import Header from '../Molecules/Header'
import Footer from '../Molecules/Footer'

import TwoColumns from './TwoColumnsLayout'
import SEO, { SEOProps } from '../SEO'

import '../all.scss'

type LayoutProps = SEOProps & {
  children: [
    ReactElement, // main
    ReactElement | null, // side
  ]
}

const Layout: FC<LayoutProps> = ({
  title, type, children,
}) => (
  <>
    <SEO title={title} type={type} />
    <TwoColumns>
      <Header />
      <main>{children[0]}</main>
      <aside>{children[1] || <div>a</div>}</aside>
      <Footer />
    </TwoColumns>
  </>
)

export default Layout
