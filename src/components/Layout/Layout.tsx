/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'

import Header from '../Header/Header'
import Footer from '../Footer'
import SEO, { SEOProps } from '../SEO'

import 'sanitize.css'
import './Layout.scss'

type LayoutProps = SEOProps & {
  sub?: React.ReactElement,
}
// |  header   |   
// -------------
// | main| sub |
// |     |     |
// -------------
// |  footer   |

// <SEO title='Articles' type="article" />

const Layout: React.FC<LayoutProps> = ({ title, type, sub, children }) => {
  return (
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
          {sub || <div className="card"></div>}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout
