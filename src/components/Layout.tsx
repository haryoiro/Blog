import React from 'react'

import Header from './Header'
import Sidebar from './SideBar'
import Footer from './Footer'
import Grid from './layouts/GridVerticalLayout'
import SEO, { SEOProps } from './SEO'

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
    <Header />
    <Grid>
      <main className="site-main">
        {children}
      </main>
      <div className="sidebar">
        {sub || <Sidebar />}
      </div>
    </Grid>
    <Footer />
  </>
)

export default Layout
