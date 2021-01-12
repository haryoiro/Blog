/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv')
const sass = require('node-sass')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    title: 'HaryoiroBlog',
    description: 'フロントエンドとか気になった技術とか',
    author: 'Haryoiro',
    siteUrl: 'https://www.haryoiro.com/',
    githubId: 'haryoiro',
    charset: 'utf-8',
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_REFRESH: false,
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
          // autoprefixer({
          //   grid: 'autoplace',
          //   browsers: ['ie >= 11'],
          // }),
          cssnano({
            preset: [
              'default',
            ],
          }),
        ],
      },
    },
    'gatsby-plugin-remove-fingerprints',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true,
      },
    },
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'logos',
        path: `${__dirname}/contents/logos`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/contents/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          'gatsby-transformer-remark',
        ],
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
