const dotenv = require('dotenv')

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    title: 'CloudGazelle',
    description: '',
    author: 'Haryoiro',
    charset: 'utf-8',
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_REFRESH: true,
    LAZY_IMAGES: true,
  },
  plugins: [
    // CodeGenerator
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',
        documentsPath: [
          './src/**/*.{ts, tsx}',
        ],
        codegenDelay: 1000,
      },
    },
    'gatsby-plugin-remove-fingerprints',
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
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     name: 'CloudGazelle::',
    //     short_name: 'CloudGazzle',
    //     start_url: '/',
    //     background_color: '#663399',
    //     theme_color: '#663399',
    //     display: 'minimal-ui',
    //     icon: 'src/images/gatsby-icon.png',
    //   },
    // },
    'gatsby-plugin-sass',
    // 'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true,
      },
    },
    'gatsby-plugin-typescript-checker',
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
