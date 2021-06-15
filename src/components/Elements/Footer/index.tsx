import { useStaticQuery, graphql, Link } from 'gatsby'
import React, { FC } from 'react'

export type CopylightProps = {
  author: string
}
const Copylight: FC<CopylightProps> = ({ author }) => (
  <span className="footInfomation">
    <span className="copylight">{` © ${author} 2020 - ${new Date().getFullYear()}`}</span>
    {` | `}
    <Link to="/PrivacyPolicy/">PrivacyPolicy</Link>
    {` | `}
    <Link to="/sitemap.xml">Sitemap</Link>
  </span>
)
interface FooterProps {
  className?: string
}

const Footer: FC<FooterProps> = ({ className }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <div className={className || ' '}>
      <Copylight author={site.siteMetadata.author} />
    </div>
  )
}

export default Footer
