import React from 'react'

import Header from './Header'
import Sidebar from './SideBar'
import Footer from './Footer'
import SEO, { SEOProps } from './SEO'

import 'sanitize.css'

type LayoutProps = SEOProps & {
  sub?: React.ReactElement,
  topic?: string,
}
// |  header   |
// -------------
// |   hero    |
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
