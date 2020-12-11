const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(
        `
          {
             allMicrocmsArticles {
              edges {
                node {
                  id
                  title
                  title_origin
                  category {
                     id
                     name
                  }
                  body
                  features
                }
              }
            }
          }
        `
      )

    if (result.errors) {
        throw result.errors
    }
 
    result.data.allMicrocmsArticles.edges.forEach(edge => {
        const subDir = '/article/'+edge.node.title
        createPage({
            //path: `/patients/${edge.node.id}`,
            path: `${subDir}`,
            component: path.resolve(
                "./src/templates/article.js"
            ),
            context: {
            id: edge.node.id,
            },
        })
   
    })
}