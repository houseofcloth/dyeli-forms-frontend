const CleanCSS = require('clean-css');
const htmlmin = require('html-minifier')
const yaml = require("js-yaml")
const marked = require('marked')
// Get input/output directories from `package.json`
const inDir = "src",
      outDir = "dist",
      // Where site is deployed
      basePath = '/forms'

module.exports = function(eleventyConfig) {
  
  // Copy assets
  eleventyConfig.addPassthroughCopy({'src/assets': `${basePath}/assets`});

  // Copyright year
  eleventyConfig.addShortcode("copyrightYear", () => `${new Date().getFullYear()}` )

  // YAML instead of JSON for _data
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents))

  // Used marked to parse Frontmatter as markdown (because couldn't figure out
  // how to do it using built-in markdown parser.)
  eleventyConfig.addFilter('marked', function(content) {
    return marked.parse(content)
  })

  // Build date of pages
  eleventyConfig.addGlobalData("buildDate", () => `${new Date().toString()}` )  
  // Form submit
  eleventyConfig.addGlobalData("workerFn", `${basePath}/submit`)
  // Session ID/token
  eleventyConfig.addGlobalData("sessionApiBase", `${basePath}/session`)
  // Make basePath available everywhere
  eleventyConfig.addGlobalData("basePath", basePath)
  
  // https://www.11ty.dev/docs/config/#transforms-example-minify-html-output
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        ignoreCustomComments: [ /^ Date:(.*)/ ],
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      });
      return minified;
    }

    return content;
  })

  return {
    dir: {
      input: inDir,
      output: outDir,
    }
  }

}
