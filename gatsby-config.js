/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
if (process.env.ENVIRONMENT !== 'production') {
  require('dotenv').config()
}

module.exports = {
  siteMetadata: {
    title: 'haryoiro/blog',
    description: '',
    author: '@haryoiro',
    charset: 'utf-8',
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'haryoiro-tech-blog',
        short_name: 'haryoblog',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    // 'gatsby-plugin-offline',
    // 'gatsby-plugin-typescript',
    // 'gatsby-plugin-typescript-checker',
    // CodeGenerator
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',
      },
    },
    // Linter
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images-contentful',
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: 'lazy',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images-contentful',
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: 'lazy',
            },
          },
        ],
      },
    },
    // BLOG記事ソース Contentful
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CF_SPACE_ID,
        accessToken: process.env.CF_ACCESS_TOKEN,
      },
    },
  ],
}
