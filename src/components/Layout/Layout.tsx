import React from 'react'

import Header from '../Header/Header'
import Sidebar from '../SideBar/SideBar'
import Footer from '../Footer/Footer'
import SEO, { SEOProps } from '../SEO'

import 'sanitize.css'
import './Layout.scss'

type LayoutProps = SEOProps & {
  sub?: React.ReactElement,
};
// |  header   |
// -------------
// | main| sub |
// |     |     |
// -------------
// |  footer   |

// <SEO title='Articles' type="article" />

const Layout: React.FC<LayoutProps> = ({
  title, type, sub, children,
}) => (
  <>
    <SEO title={title} type={type} />
    <Header className="site-header" />
    <div className="hero">
      {/* <h1>Blog</h1> */}
    </div>
    <div className="site-content" id="content">
      <main className="site-main">
        {children}
      </main>
      <div className="sidebar">
        {sub || <Sidebar />}
      </div>
    </div>
    <Footer />
  </>
)

export default Layout
