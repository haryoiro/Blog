const dotenv = require('dotenv')
const sass = require('sass')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    title: 'CloudGazelle',
    description: 'フロントエンドとか気になった技術とか',
    author: 'Haryoiro',
    siteUrl: 'https://cloudgazelle.netlify.app/',
    githubId: 'haryoiro',
    charset: 'utf-8',
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    FAST_REFRESH: true,
    LAZY_IMAGES: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: sass,
        sassRuleTest: /\.scss$/,
        sassRuleModulesTest: /\.module\.scss$/,
        postCssPlugins: [
          autoprefixer({ grid: 'autoplace' }),
          cssnano({ preset: 'default' }),
        ],
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
    {
    // BLOG記事ソース Contentful
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CF_SPACE_ID,
        accessToken: process.env.CF_ACCESS_TOKEN,
      },
    },
    {
      // CodeGenerator
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',

        // Codegenはとても重いので以下の場合のみtrueにすること
        //   - 新たなプラグインを追加した。
        //   - 新たなクエリを追加した。
        //   - 既存のクエリを編集した。

        codegen: false,

        documentsPath: ['./src/**/*.{ts, tsx}'],
      },
    },
  ],
}
