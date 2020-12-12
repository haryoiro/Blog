const path = require("path")

const getArticles = `
query getArticles {
  allContentfulArticles {
    edges {
      node {
        body {
          child: childMdx {
            text: excerpt
          }
        }
        id
        createdAt
        title
        tags
      }
    }
  }
}
`


exports.createPages = async ({ graphql, actions }) => {
  
    const { createPage } = actions
    const result = await graphql(getArticles)

    console.log(result)
    
    if (result.error) {throw result.error}

    result.data.allContentfulArticles.edges.forEach(edge => {
        const subDir = `/article/${edge.node.title}`
        createPage({
            path: subDir,
            component: path.resolve(
                "./src/templates/article.js"
            ),
            context: {
            id: edge.node.id,
            },
        })
    
    }) 
}


// query MyQuery {
//   contentfulArticles {
//     id
//     features
//     title
//     tags
//     createdAt
//     body: childContentfulArticlesBodyTextNode {
//       child: childMdx {
//         text: excerpt
//       }
//     }
//   }
// }
