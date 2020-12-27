import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'

const ArticlesListPage = () => {

  return (
    <Layout title="TOP" type="article">
      <Link to='/blog'>HOME</Link>
    </Layout>
  )
}


export default ArticlesListPage

