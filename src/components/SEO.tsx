/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { Helmet } from 'react-helmet'

import useSiteMetadata from './SiteMetadata'

type Props = {
  type: 'website' | 'article'
  title: string | null | undefined
}

export const SEO: React.FC<Props> = ({
  type,
  title,
}) => {
  const siteMetadata = useSiteMetadata()

  const siteName = siteMetadata.title
  const description = siteMetadata.description
  const siteUrl = siteMetadata.siteUrl

  const metaTitle = title
    ? `${title} | ${siteName}`
    : siteName

  return (
    <Helmet>
      <html lang="ja" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{metaTitle}</title>

      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      <meta name="application-name" content={siteName} />
      <meta name="author" content="Haryoiro" /> 
      <meta name="description" content={description} />
      <meta name="theme-color" content="#fff" />

      <meta property="og:locale" content="ja" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      {/* <meta property="og:url" content="/" /> */}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <script async src='https://www.googletagmanager.com/gtag/js?id=G-VMYZ7W9W96'></script>
      <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VMYZ7W9W96');
      `}
      </script>
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  )
}

export default SEO
