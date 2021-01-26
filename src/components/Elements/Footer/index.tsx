import { useStaticQuery, graphql, Link } from 'gatsby'
import React, { FC } from 'react'

export type CopylightProps = {
  author: string
}
const Copylight: FC<CopylightProps> = ({ author }) => (
  <span className="copylight">
    <Link to="/sitemap.xml">サイトマップ</Link>
    <span>{` © ${author} 2020 - ${new Date().getFullYear()}`}</span>
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
