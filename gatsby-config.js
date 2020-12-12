const dotenv = require('dotenv')

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    title: `HaryoiroTechBlog`,
    description: ``,
    author: `@gatsbyjs`,
    charset: `utf-8`,
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: "lazy",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: "lazy",
            },
          },
        ],
      },
    },
    // BLOG記事ソース Contentful
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CF_SPACE_ID,
        accessToken: process.env.CF_ACCESS_TOKEN,
      }
    },
    {
      // BLOG記事ソース
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: process.env.MS_X_API_KEY,
        serviceId: process.env.MS_SERVICE_ID,
        apis: [{
          endpoint: 'articles',
        }]
      }
    }
  ],
}
