import dotenv from 'dotenv'
import sass from 'sass'
import cssnano from 'cssnano'
import type { GatsbyConfig } from 'gatsby'

if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config()
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'HaryoiroBlog',
    description: 'フロントエンドとか気になった技術とか',
    author: 'Haryoiro',
    siteUrl: 'https://www.haryoiro.com/',
    githubId: 'haryoiro',
    charset: 'utf-8'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: sass,
        sassRuleTest: /\.scss$/,
        sassRuleModulesTest: /\.module\.scss$/,
        postCssPlugins: [
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          // require('autoprefixer')({
          //   cascade: false
          // }),
          cssnano({
            preset: 'default'
          })
        ]
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.haryoiro.com/',
        sitemap: 'https://www.haryoiro.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'logos',
        path: `${__dirname}/contents/logos`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/contents/blog`
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
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
              elements: ['h2', 'h3']
            }
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
                ts: 'typescript'
              }
            }
          }
        ]
      }
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
        documentsPath: ['./src/**/*.{ts, tsx}']
      }
    }
  ]
}

module.exports = config
