import { Maybe, MdxFrontmatter } from './graphql-types'

export interface IArticle {
  id: string
  className: string
  title: string
  slug: string
  createdAt: string
  tags: Maybe<Pick<MdxFrontmatter, 'tags'>>
  body: string
  category: string
  style: any
}

export type ArticleProps = Partial<IArticle>
