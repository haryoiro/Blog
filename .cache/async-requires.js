// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./../../dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-tsx": () => import("./../../../src/pages/404.tsx" /* webpackChunkName: "component---src-pages-404-tsx" */),
  "component---src-pages-index-tsx": () => import("./../../../src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-templates-article-list-template-index-tsx": () => import("./../../../src/templates/ArticleListTemplate/index.tsx" /* webpackChunkName: "component---src-templates-article-list-template-index-tsx" */),
  "component---src-templates-article-template-index-tsx": () => import("./../../../src/templates/ArticleTemplate/index.tsx" /* webpackChunkName: "component---src-templates-article-template-index-tsx" */),
  "component---src-templates-tags-template-index-tsx": () => import("./../../../src/templates/TagsTemplate/index.tsx" /* webpackChunkName: "component---src-templates-tags-template-index-tsx" */)
}

