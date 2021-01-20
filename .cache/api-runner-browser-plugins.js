module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-typography/gatsby-browser.js'),
      options: {"plugins":[],"pathToConfigModule":"src/utils/typography"},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extensions":[".md",".mdx"],"gatsbyRemarkPlugins":["gatsby-remark-prismjs-title",{"resolve":"gatsby-remark-autolink-headers","options":{"icon":false,"elements":["h2","h3"]}},{"resolve":"gatsby-remark-prismjs","options":{"classPrefix":"language-","showLineNumbers":false,"noInlineHighlight":false,"aliases":{"sh":"bash","js":"javascript","ts":"typescript"}}}],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
