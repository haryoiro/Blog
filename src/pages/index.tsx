import React, { FC } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'

const ArticlesListPage: FC = () => (
  <Layout title="TOP" type="article">
    <Link to="/blog">HOME</Link>
  </Layout>
)

export default ArticlesListPage
