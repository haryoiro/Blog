import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

import useSiteMetadata from './SiteMetadata'

export type SEOProps = {
  type: 'website' | 'article'
  title: string | null | undefined,
  description?: string | null | undefined
}
export const SEO: FC<SEOProps> = ({
  type,
  title,
  description,
}) => {
  const siteMetadata = useSiteMetadata()
  const { siteUrl } = siteMetadata
  const siteName = siteMetadata.title
  const siteDescription = siteMetadata.description

  const metaTitle = title
    ? `${siteName} | ${title}`
    : siteName

  return (
    <Helmet>
      <html lang="ja" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{metaTitle}</title>

      <meta name="application-name" content={siteName} />
      <meta name="author" content="Haryoiro" />
      <meta name="description" content={siteDescription} />
      <meta name="theme-color" content="#fff" />

      <meta property="og:locale" content="ja" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      {/* <meta property="og:url" content="/" /> */}
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:site_name" content={siteName} />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-VMYZ7W9W96" />
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
