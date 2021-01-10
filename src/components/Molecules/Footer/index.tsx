import { useStaticQuery, graphql } from 'gatsby'
import React, { FC } from 'react'

export type CopylightProps = {
  author: string
}
const Copylight: FC<CopylightProps> = ({ author }) => (
  <span className="copylight">
    <span>
      Built with
      {' '}
      <strong>Gatsby.</strong>
      {' '}
    </span>
    <span>{`${author}  © 2020 - ${new Date().getFullYear()}`}</span>
  </span>
)
interface FooterProps {
  className: string;
}

const Footer: FC<FooterProps> = ({
  className,
}) => {
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
    <footer className={className}>
      <Copylight author={site.siteMetadata.author} />
    </footer>
  )
}

export default Footer
