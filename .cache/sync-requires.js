

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": (preferDefault(require("/Users/dev/ssg-blog-example/.cache/dev-404-page.js"))),
  "component---src-pages-404-tsx": (preferDefault(require("/Users/dev/ssg-blog-example/src/pages/404.tsx"))),
  "component---src-pages-index-tsx": (preferDefault(require("/Users/dev/ssg-blog-example/src/pages/index.tsx"))),
  "component---src-templates-article-list-template-index-tsx": (preferDefault(require("/Users/dev/ssg-blog-example/src/templates/ArticleListTemplate/index.tsx"))),
  "component---src-templates-article-template-index-tsx": (preferDefault(require("/Users/dev/ssg-blog-example/src/templates/ArticleTemplate/index.tsx"))),
  "component---src-templates-tags-template-index-tsx": (preferDefault(require("/Users/dev/ssg-blog-example/src/templates/TagsTemplate/index.tsx")))
}

