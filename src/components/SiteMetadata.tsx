import { graphql, useStaticQuery } from 'gatsby'

type Result = {
  title: string,
  description: string,
  author: string,
  siteUrl: string,
}

const useSiteMetadata = (): Result => {
  const { site } = useStaticQuery(graphql`
    query SITE_METADATA {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)
  return site.siteMetadata
}

export default useSiteMetadata
