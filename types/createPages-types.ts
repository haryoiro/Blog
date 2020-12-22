export type Articles = {
  allContentfulArticles: {
    edges: Array<{ 
      node: {
        slug: string
      }
    }>
  }
}
