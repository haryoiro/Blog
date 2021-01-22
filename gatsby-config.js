/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const dotenv = require('dotenv')
const sass = require('sass')
// const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    title: 'HaryoiroBlog',
    description: 'フロントエンドとか気になった技術とか',
    author: 'Haryoiro',
    siteUrl: 'https://www.haryoiro.com/blog/',
    githubId: 'haryoiro',
    charset: 'utf-8',
  },
  flags: {
    // PRESERVE_WEBPACK_CACHE: false,
    // PRESERVE_FILE_DOWNLOAD_CACHE: false,
    // FAST_REFRESH: true,
    // LAZY_IMAGES: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: sass,
        sassRuleTest: /\.scss$/,
        sassRuleModulesTest: /\.module\.scss$/,
        postCssPlugins: [
          cssnano({
            preset: [
              'default',
            ],
          }),
        ],
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.haryoiro.com',
        sitemap: 'https://www.haryoiro.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/blog/' }],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
          'gatsby-remark-prismjs-title',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
              elements: ['h2', 'h3'],
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              showLineNumbers: false,
              noInlineHighlight: false,
              aliases: {
                fish: 'bash',
                sh: 'bash',
                js: 'javascript',
                ts: 'typescript',
              },
            },
          },
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
        documentsPath: [
          './src/**/*.{ts, tsx}',
          './node_modules/gatsby-*/**/*.js',
        ],
      },
    },
  ],
}
