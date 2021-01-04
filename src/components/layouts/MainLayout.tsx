import React from 'react'

import Header from '../Molecules/Header'
import Sidebar from '../SideBar'
import Footer from '../Molecules/Footer'

import TwoColumn from './TwoColumnLayout'
import SEO, { SEOProps } from '../SEO'

import 'sanitize.css'
import './all.scss'

type LayoutProps = SEOProps & {
  sub?: React.ReactElement,
  topic?: string,
}

const Layout: React.FC<LayoutProps> = ({
  title, type, sub, children,
}) => (
  <>
    <SEO title={title} type={type} />
    <TwoColumn>
      <Header />
      <main className="site-main">
        {children}
      </main>
      <div className="sidebar">
        {sub || <Sidebar />}
      </div>
      <Footer />
    </TwoColumn>
  </>
)

export default Layout
