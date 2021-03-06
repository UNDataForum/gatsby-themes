const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    siteTitle: 'United Nations World Data Forum',
    siteDescription: 'This is the site description from gatsby-config.js.',
    siteUrl: pkg.homepage,
    siteTwitter: 'undataforum',
    siteLanguage: 'en',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-remark-images',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              showCaptions: true,
              // Broken in gatsby-plugin-mdx.
              // markdownCaptions: true,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: (file) => `downloads/${file.hash}/${file.name}`,
            },
          },
        ],
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-base',
      options: {
        mdxOtherwiseConfigured: true,
      },
    },
    '@undataforum/gatsby-theme-theme-ui',
    {
      resolve: '@undataforum/gatsby-theme-posts-core',
      options: {
        // basePath: '/',
        collection: 'blog',
        // contentPath: 'content/posts',
        mdxOtherwiseConfigured: true,
        // This option is passed through to page components.
        tagCollection: 'tags',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-posts-core',
      options: {
        // basePath: '/',
        collection: 'news',
        contentPath: 'content/articles',
        mdxOtherwiseConfigured: true,
        // This option is passed through to page components.
        tagCollection: 'tags',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-events-core',
      options: {
        // basePath: '/',
        collection: 'webinars',
        // contentPath: 'content/events',
        mdxOtherwiseConfigured: true,
        // This option is passed through to page components.
        tagCollection: 'tags',
      },
    },
    {
      resolve: '@undataforum/gatsby-theme-profiles-core',
      options: {
        // basePath: '/',
        // collection: 'profiles',
        // contentPath: 'content/profiles',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-pages-core',
      options: {
        // basePath: '/',
        // contentPath: 'content/pages',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: {
        // basePath: '/',
        // tagCollection: 'tags',
        mdxCollections: ['blog', 'news', 'webinars'],
      },
    },
  ],
};
