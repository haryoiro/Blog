import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const ArticlesListPage = () => {

  return (
    <Layout>
      <SEO 
        title="All articles"
        type="website"
      />
      <Link to='/blog'>HOME</Link>
    </Layout>
  )
}


export default ArticlesListPage

