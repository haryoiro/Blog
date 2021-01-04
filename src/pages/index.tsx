import React, { FC } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layouts/MainLayout'

const ArticlesListPage: FC = () => (
  <Layout title="TOP" type="article">
    <Link to="/blog">HOME</Link>
    <div />
  </Layout>
)

export default ArticlesListPage
