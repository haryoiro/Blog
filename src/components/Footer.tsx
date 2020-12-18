import { Link, useStaticQuery, graphql } from 'gatsby'
import React from 'react'

export type CopylightProps = {
  author: string
}

const Copylight: React.FC<CopylightProps> = ({ author }) => (
  <div className="copylight">
    {`© ${new Date().getFullYear()}\t ${author}`}
  </div>
)

const Footer: React.FC = () => {

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
  <footer>
    <div>
      <Copylight author={site.siteMetadata.author} />
    </div>
  </footer>
  )
}

export default Footer
