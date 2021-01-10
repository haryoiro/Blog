export interface IArticle {
  id: string
  className: string
  title: string
  slug: string
  createdAt: string
  tags: Array<string>
  body: string
  category: string
}

export type ArticleProps = Partial<IArticle>
