export interface IArticle {
  id: string
  className: string
  title: string
  slug: string
  createdAt: string
  tags: Array<string>
  body: string
  category: string
  style: any
}

export type ArticleProps = Partial<IArticle>
